import { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { Upload, Plus, Trash2, Eye, BookOpen, Video, FileText, DollarSign, Tag, User, List, PlayCircle, Calendar, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

// Context for managing courses globally
const CourseContext = createContext();

function CourseProvider({ children }) {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://higherpolynomial-node.vercel.app/api/courses?role=admin');
      if (response.ok) {
        const data = await response.json();
        // Convert array to object keyed by ID
        const coursesObj = {};
        (data.courses || []).forEach(c => {
          coursesObj[c.id] = c;
        });
        setCourses(coursesObj);
      }
    } catch (error) {
      console.error("Error fetching courses in context:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = (course) => {
    setCourses(prev => ({ ...prev, [course.id]: course }));
  };

  const updateCourse = (courseId, updates) => {
    setCourses(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], ...updates }
    }));
  };

  return (
    <CourseContext.Provider value={{ courses, loading, addCourse, updateCourse, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
}

function useCourses() {
  return useContext(CourseContext);
}

// Helper for direct S3 uploads via Presigned URLs
const uploadToS3Directly = async (file, onProgress) => {
  if (!file) return null;
  if (typeof file === 'string') return file; // Already an S3 URL
  const contentType = file.type || 'application/octet-stream';
  try {
    const resp = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/generate-presigned-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(contentType)}`);
    if (!resp.ok) throw new Error("Could not generate upload URL");
    const { uploadUrl, publicUrl } = await resp.json();

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", contentType);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
      xhr.onload = () => xhr.status === 200 ? resolve(publicUrl) : reject(new Error("S3 Upload Failed"));
      xhr.onerror = () => reject(new Error("S3 Upload Error"));
      xhr.send(file);
    });
  } catch (error) {
    console.error("Direct Upload Error:", error);
    throw error;
  }
};

// Main Admin Dashboard Component with Nested Routing
export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <CourseProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> Admin Dashboard</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('courses')}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition"
                >
                  View All Courses
                </button>
                <button
                  onClick={() => navigate('create-course')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg"
                >
                  Create Course
                </button>
                <button
                  onClick={() => navigate('doubt-sessions')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition shadow-md hover:shadow-lg"
                >
                  Doubt Sessions
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area with Nested Routes */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route index element={<Navigate to="courses" replace />} />
            <Route path="courses" element={<CourseListPage />} />
            <Route path="create-course" element={<CreateCoursePage isEdit={false} />} />
            <Route path="edit-course/:id" element={<CreateCoursePage isEdit={true} />} />
            <Route path="playlists/:id" element={<ManagePlaylistsPage />} />
            <Route path="preview/:id" element={<CoursePreviewPage />} />
            <Route path="doubt-sessions" element={<DoubtSessionsPage />} />
          </Routes>
        </main>
      </div>
    </CourseProvider>
  );
}

// NEW: Course List Page
function CourseListPage() {
  const navigate = useNavigate();
  const { courses: coursesObj, loading: contextLoading, fetchCourses } = useCourses();
  const courses = Object.values(coursesObj);
  const loading = contextLoading;
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  // We don't need a local fetchCourses anymore, it's in the context
  // but if we want to force refresh on mount:
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handlePublishCourse = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/courses/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchCourses(); // Refresh
      }
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (deletingCourseId !== id) {
      setDeletingCourseId(id);
      setTimeout(() => setDeletingCourseId(null), 3000); // Reset after 3 seconds
      return;
    }

    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success("Course deleted successfully");
        setDeletingCourseId(null);
        fetchCourses(); // Refresh list
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting course");
    }
  };

  if (loading) return <div className="text-center py-12">Loading courses...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">All Courses</h2>
          <p className="mt-2 text-gray-600">Manage your course content and playlists</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-40 bg-gray-200 relative">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <BookOpen size={48} />
                </div>
              )}
            </div>
            {/* Course Card Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 uppercase">
                  {course.category || 'General'}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {course.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Video size={14} /> Playlists available</span>
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">${course.price}</span>
                </div>

                <button
                  onClick={() => handlePublishCourse(course.id, course.status)}
                  className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${course.status === 'published'
                    ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                  <Eye size={16} />
                  {course.status === 'published' ? 'Move to Draft' : 'Publish Course'}
                </button>

                <button
                  onClick={() => navigate(`/admin-dashboard/playlists/${course.id}`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg"
                >
                  Manage Playlists
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/admin-dashboard/edit-course/${course.id}`)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    <Eye size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-all text-sm ${deletingCourseId === course.id
                      ? 'bg-red-600 border-red-600 text-white animate-pulse'
                      : 'border-red-200 text-red-600 hover:bg-red-50'
                      }`}
                  >
                    <Trash2 size={16} />
                    {deletingCourseId === course.id ? 'Confirm?' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
          <p className="text-gray-500 mt-1">Start by creating your first course!</p>
          <button
            onClick={() => navigate('/admin-dashboard/create-course')}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg"
          >
            Create Course
          </button>
        </div>
      )}
    </div>
  );
}

// Create / Edit Course Page
function CreateCoursePage({ isEdit = false }) {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { addCourse, updateCourse } = useCourses();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: null,
    promoVideo: null,
    notes: null
  });
  const [errors, setErrors] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && courseId) {
      fetchCourseData();
    }
  }, [isEdit, courseId]);

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        const course = data.course;
        setFormData({
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
          thumbnail: null,
          promoVideo: null,
          notes: null
        });
        setThumbnailPreview(course.thumbnail);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Design', 'Marketing', 'Business'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));

      if (type === 'thumbnail') {
        const reader = new FileReader();
        reader.onloadend = () => setThumbnailPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Course title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.thumbnail) newErrors.thumbnail = 'Course thumbnail is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        // 1. Upload files directly to S3
        const thumbnailUrl = await uploadToS3Directly(formData.thumbnail);
        const videoUrl = await uploadToS3Directly(formData.promoVideo);
        const notesUrl = await uploadToS3Directly(formData.notes);

        const url = isEdit ? `https://higherpolynomial-node.vercel.app/api/courses/${courseId}` : 'http://localhost:3000/api/courses';
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            price: formData.price,
            createdBy: 'Admin',
            thumbnailUrl,
            videoUrl,
            notesUrl
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${isEdit ? 'update' : 'create'} course`);
        }

        const result = await response.json();

        if (isEdit) {
          toast.success("Course updated successfully");
          navigate('/admin-dashboard/courses');
        } else {
          const newCourseId = result.courseId;
          const newCourse = {
            id: newCourseId,
            ...formData,
            createdBy: 'Admin',
            createdAt: new Date().toISOString(),
            playlists: [],
            thumbnailUrl: result.urls?.thumbnail,
            videoUrl: result.urls?.video,
            notesUrl: result.urls?.notes
          };
          addCourse(newCourse);
          navigate(`/admin-dashboard/playlists/${newCourseId}`);
        }
      } catch (error) {
        console.error(`Error ${isEdit ? 'updating' : 'creating'} course:`, error);
        toast.error(`Failed to ${isEdit ? 'update' : 'create'} course. See console for details.`);
      }
    }
  };

  if (loading) return <div className="text-center py-12">Loading course data...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Course' : 'Create New Course'}</h2>
        <p className="mt-2 text-gray-600">{isEdit ? 'Update course details and content' : 'Fill in the details to create a new course'}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Course Title */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <BookOpen size={18} className="mr-2" />
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g., Complete Web Development Bootcamp"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Course Description */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText size={18} className="mr-2" />
            Course Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Describe what students will learn in this course..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Tag size={18} className="mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <DollarSign size={18} className="mr-2" />
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="29.99"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
        </div>

        {/* Course Thumbnail */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Upload size={18} className="mr-2" />
            Course Thumbnail
          </label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'}`}>
            {thumbnailPreview ? (
              <div className="space-y-3">
                <img src={thumbnailPreview} alt="Preview" className="mx-auto h-48 w-auto rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, thumbnail: null }));
                    setThumbnailPreview(null);
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="mt-3 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>
          {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
        </div>

        {/* Promotional Video */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Video size={18} className="mr-2" />
            Promotional Video (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {formData.promoVideo ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
                  <div className="flex items-center space-x-3">
                    <Video className="text-blue-600" size={24} />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-700">{formData.promoVideo.name}</p>
                      <p className="text-xs text-gray-500">Video preview will play here</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, promoVideo: null }))}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Upload a promotional video for your course</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, 'promoVideo')}
                  className="hidden"
                  id="promo-video-upload"
                />
                <label
                  htmlFor="promo-video-upload"
                  className="mt-3 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Choose Video
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Course Notes */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText size={18} className="mr-2" />
            Course Notes (PDF - Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {formData.notes ? (
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
                <span className="text-sm text-gray-700">{formData.notes.name}</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, notes: null }))}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              <div>
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'notes')}
                  className="hidden"
                  id="notes-upload"
                />
                <label
                  htmlFor="notes-upload"
                  className="mt-3 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Upload PDF
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Created By */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User size={18} className="mr-2" />
            Created By
          </label>
          <input
            type="text"
            value="Admin"
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg"
          >
            {isEdit ? 'Save Changes' : 'Create Course & Add Playlists'}
          </button>
        </div>
      </div>
    </div>
  );
}

// NEW: Manage Playlists Page
function ManagePlaylistsPage() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [course, setCourse] = useState(courses[courseId] || null);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({ title: '', description: '' });
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null); // For video preview modal
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    video: null,
    thumbnail: null,
    notes: null,
    duration: ''
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseAndPlaylists();
    }
  }, [courseId]);

  const fetchCourseAndPlaylists = async () => {
    setLoading(true);
    try {
      // Fetch full course details including playlists
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
        setPlaylists(data.playlists || []);
      } else {
        console.error("Failed to fetch course data");
      }
    } catch (error) {
      console.error("Error fetching course and playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${courseId}/playlists`);
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.playlists || []);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylist.title.trim()) {
      toast.warning("Playlist title is required");
      return;
    }

    try {
      const response = await fetch('https://higherpolynomial-node.vercel.app/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          title: newPlaylist.title,
          description: newPlaylist.description,
          orderIndex: playlists.length
        })
      });

      if (!response.ok) throw new Error('Failed to create playlist');

      const result = await response.json();
      setPlaylists(prev => [...prev, result.playlist]);
      setNewPlaylist({ title: '', description: '' });
      toast.success("Playlist created successfully!");
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error("Failed to create playlist");
    }
  };

  const handleUpdatePlaylist = async (id) => {
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlaylist)
      });

      if (response.ok) {
        toast.success("Playlist updated");
        setEditingPlaylist(null);
        fetchPlaylists();
      }
    } catch (error) {
      toast.error("Error updating playlist");
    }
  };

  const handleDeletePlaylist = async (id) => {
    if (!confirm("Are you sure? This will delete all videos in this playlist.")) return;
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/playlists/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success("Playlist deleted");
        fetchPlaylists();
        if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
      }
    } catch (error) {
      toast.error("Error deleting playlist");
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedPlaylist) {
      toast.warning("Please select a playlist first");
      return;
    }

    if (!newVideo.title || !newVideo.video) {
      toast.warning("Video title and file are required");
      return;
    }

    const videoId = Date.now();
    setUploadProgress(prev => ({ ...prev, [videoId]: 0 }));

    try {
      // 1. Upload files directly to S3
      const videoUrl = await uploadToS3Directly(newVideo.video, (p) => {
        setUploadProgress(prev => ({ ...prev, [videoId]: p }));
      });

      // Simple progress for others as they are usually small
      const thumbnailUrl = await uploadToS3Directly(newVideo.thumbnail);
      const notesUrl = await uploadToS3Directly(newVideo.notes);

      // 2. Send metadata and S3 URLs to backend
      const response = await fetch('https://higherpolynomial-node.vercel.app/api/admin/upload-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          playlistId: selectedPlaylist.id,
          title: newVideo.title,
          description: newVideo.description,
          duration: newVideo.duration || '00:00',
          videoUrl,
          thumbnailUrl,
          notesUrl
        })
      });

      if (!response.ok) throw new Error('Failed to save video metadata');

      const result = await response.json();
      setUploadProgress(prev => ({ ...prev, [videoId]: 100 }));

      // Refresh playlists to show new video
      await fetchPlaylists();

      setNewVideo({ title: '', description: '', video: null, thumbnail: null, notes: null, duration: '' });
      toast.success("Video uploaded successfully!");

      // Clear progress after 2 seconds
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[videoId];
          return newProgress;
        });
      }, 2000);

    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[videoId];
        return newProgress;
      });
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/videos/${videoId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success("Video deleted");
        fetchPlaylists(); // Refresh list to update video counts/state
      }
    } catch (error) {
      toast.error("Error deleting video");
    }
  };

  const handleUpdateVideo = async (videoId) => {
    try {
      setLoading(true);

      // 1. Upload new files if provided
      const videoUrl = editingVideo.videoFile ? await uploadToS3Directly(editingVideo.videoFile) : undefined;
      const thumbnailUrl = editingVideo.thumbnailFile ? await uploadToS3Directly(editingVideo.thumbnailFile) : undefined;
      const notesUrl = editingVideo.notesFile ? await uploadToS3Directly(editingVideo.notesFile) : undefined;

      // 2. Send update to backend
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/videos/${videoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingVideo.title,
          description: editingVideo.description,
          duration: editingVideo.duration,
          videoUrl,
          thumbnailUrl,
          notesUrl
        })
      });

      if (response.ok) {
        toast.success("Video updated");
        setEditingVideo(null);
        fetchPlaylists();
      } else {
        throw new Error("Failed to update video");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(`Error updating video: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading course content...</div>;
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-red-600">Course not found</h2>
        <button
          onClick={() => navigate('/admin-dashboard/courses')}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md"
        >
          Back to Course List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Manage Playlists & Videos</h2>
        <p className="mt-2 text-gray-600">Course: <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{course.title}</span></p>
      </div>

      {playlists.length === 0 && (
        <div className="mb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold mb-2">Next Step: Build your course content 🚀</h3>
            <p className="text-blue-100 mb-6">Your course has been created successfully! Now, organize your learning materials by creating **Playlists** (sections) and then uploading **Videos** to them.</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/30 text-sm">
                <span className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
                Create a Playlist
              </div>
              <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/30 text-sm">
                <span className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
                Upload Videos
              </div>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <Video size={200} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Create Playlist (remains same) */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <List size={24} className="mr-2 text-blue-600" />
            Create Playlist
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Playlist Title</label>
              <input
                type="text"
                value={newPlaylist.title}
                onChange={(e) => setNewPlaylist(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., HTML & CSS Basics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={newPlaylist.description}
                onChange={(e) => setNewPlaylist(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of this playlist..."
              />
            </div>

            <button
              onClick={handleCreatePlaylist}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Create Playlist
            </button>
          </div>

          {/* Playlists List */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Playlists ({playlists.length})</h4>
            <div className="space-y-2">
              {playlists.map((playlist, index) => (
                <div
                  key={playlist.id}
                  className={`p-4 border rounded-lg cursor-pointer transition ${selectedPlaylist?.id === playlist.id
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                  onClick={() => setSelectedPlaylist(playlist)}
                >
                  {editingPlaylist?.id === playlist.id ? (
                    <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        className="w-full px-2 py-1 border rounded"
                        value={editingPlaylist.title}
                        onChange={e => setEditingPlaylist({ ...editingPlaylist, title: e.target.value })}
                      />
                      <textarea
                        className="w-full px-2 py-1 border rounded"
                        value={editingPlaylist.description}
                        onChange={e => setEditingPlaylist({ ...editingPlaylist, description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdatePlaylist(playlist.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
                        <button onClick={() => setEditingPlaylist(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {index + 1}. {playlist.title}
                        </p>
                        {playlist.description && (
                          <p className="text-sm text-gray-500 mt-1">{playlist.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPlaylist(playlist);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlaylist(playlist.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {playlists.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No playlists created yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Upload Videos */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Video size={24} className="mr-2 text-blue-600" />
            Upload Video
          </h3>

          {selectedPlaylist ? (
            <>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">Uploading to:</p>
                <p className="font-semibold text-blue-900">{selectedPlaylist.title}</p>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto px-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Introduction to HTML"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Description</label>
                  <textarea
                    value={newVideo.description}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Briefly explain what's in this video..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setNewVideo(prev => ({ ...prev, video: e.target.files[0] }))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewVideo(prev => ({ ...prev, thumbnail: e.target.files[0] }))}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (PDF)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewVideo(prev => ({ ...prev, notes: e.target.files[0] }))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 10:45"
                    />
                  </div>
                </div>

                <button
                  onClick={handleUploadVideo}
                  disabled={!newVideo.title || !newVideo.video}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 shadow-md hover:shadow-lg"
                >
                  <Upload size={18} className="mr-2" />
                  Upload & Add to Playlist
                </button>

                {/* Uploaded Videos List in Selected Playlist */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Video size={18} className="mr-2 text-blue-600" />
                    Videos in this Playlist
                  </h4>
                  <div className="space-y-3">
                    {playlists.find(p => p.id === selectedPlaylist.id)?.videos?.map((vid, idx) => (
                      <div key={vid.id} className="p-3 border rounded-lg bg-gray-50">
                        {editingVideo?.id === vid.id ? (
                          <div className="space-y-3">
                            <input className="w-full px-2 py-1 border rounded" value={editingVideo.title} onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })} />
                            <textarea className="w-full px-2 py-1 border rounded" value={editingVideo.description} onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })} />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs block mb-1">New Video</label>
                                <input type="file" className="text-xs" onChange={e => setEditingVideo({ ...editingVideo, videoFile: e.target.files[0] })} />
                              </div>
                              <div>
                                <label className="text-xs block mb-1">New Thumbnail</label>
                                <input type="file" className="text-xs" onChange={e => setEditingVideo({ ...editingVideo, thumbnailFile: e.target.files[0] })} />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleUpdateVideo(vid.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
                              <button onClick={() => setEditingVideo(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden">
                                {vid.thumbnail && <img src={vid.thumbnail} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{idx + 1}. {vid.title}</p>
                                <p className="text-xs text-gray-500">{vid.duration || '00:00'}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setPreviewVideo(vid)}
                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                                title="Preview Video"
                              >
                                <PlayCircle size={16} />
                              </button>
                              <button onClick={() => setEditingVideo(vid)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleDeleteVideo(vid.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!playlists.find(p => p.id === selectedPlaylist.id)?.videos || playlists.find(p => p.id === selectedPlaylist.id)?.videos.length === 0) && (
                      <p className="text-center py-4 text-sm text-gray-500">No videos in this playlist yet</p>
                    )}
                  </div>
                </div>

                {/* Video Preview Modal */}
                {previewVideo && (
                  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden relative">
                      <button
                        onClick={() => setPreviewVideo(null)}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-black p-2 rounded-full z-10"
                      >
                        <Plus size={24} className="rotate-45" />
                      </button>
                      <div className="aspect-video bg-black">
                        <video src={previewVideo.video_url} controls className="w-full h-full" autoPlay />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold">{previewVideo.title}</h3>
                        <p className="text-gray-600 mt-1">{previewVideo.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {Object.keys(uploadProgress).length > 0 && (
                  <div className="mt-4">
                    {Object.entries(uploadProgress).map(([id, progress]) => (
                      <div key={id} className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <List size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a playlist from the left to upload videos</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/admin-dashboard/courses')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back to Course List
        </button>
        <button
          onClick={() => navigate(`/admin-dashboard/preview/${courseId}`)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
        >
          Preview Course
        </button>
      </div>
    </div>
  );
}

// Course Preview Component (simplified - would need to fetch actual data)
function CoursePreviewPage() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const course = courses[courseId];
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourseData(data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handlePublish = async () => {
    const displayCourse = courseData?.course || course;
    const newStatus = displayCourse.status === 'published' ? 'draft' : 'published';

    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/courses/${courseId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success(`Course ${newStatus} successfully!`);
        fetchCourseData(); // Refresh preview
      }
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  if (!course && !courseData) {
    return <div className="text-center py-12">Course not found</div>;
  }

  const displayCourse = courseData?.course || course;
  const playlists = courseData?.playlists || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Course Preview</h2>
          <p className="mt-2 text-gray-600">Review your course structure</p>
        </div>
        <button
          onClick={() => navigate('/admin-dashboard/create-course')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
        >
          Create Another Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayCourse.title}</h1>
        <p className="text-gray-700 mb-6">{displayCourse.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Price</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">${displayCourse.price}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Category</p>
            <p className="text-lg font-semibold">{displayCourse.category}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Playlists</p>
            <p className="text-lg font-semibold">{playlists.length}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Course Structure</h3>
        <div className="space-y-4">
          {playlists.map((playlist, pIndex) => (
            <div key={playlist.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Playlist {pIndex + 1}: {playlist.title}
              </h4>
              {playlist.description && (
                <p className="text-sm text-gray-600 mb-3">{playlist.description}</p>
              )}
              <div className="pl-4 space-y-2">
                {playlist.videos && playlist.videos.map((video, vIndex) => (
                  <div key={video.id} className="flex items-center text-sm text-gray-700">
                    <Video size={16} className="mr-2 text-blue-600" />
                    <span>Video {vIndex + 1}: {video.title}</span>
                    {video.duration && <span className="ml-auto text-gray-500">{video.duration}</span>}
                  </div>
                ))}
                {(!playlist.videos || playlist.videos.length === 0) && (
                  <p className="text-sm text-gray-500 italic">No videos in this playlist yet</p>
                )}
              </div>
            </div>
          ))}

          {playlists.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No playlists created yet
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate(`/admin-dashboard/playlists/${courseId}`)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Edit Playlists
          </button>
          <button
            onClick={handlePublish}
            className={`px-6 py-3 rounded-lg text-white font-bold transition ${(courseData?.course || course).status === 'published'
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-green-600 hover:bg-green-700'
              }`}
          >
            {(courseData?.course || course).status === 'published' ? 'Unpublish Course' : 'Publish Course'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DoubtSessionsPage() {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'availability'
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [duration, setDuration] = useState('1 hour');
  const [meetLink, setMeetLink] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Availability State
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { courses } = useCourses();
  const [slotForm, setSlotForm] = useState({
    date: '',
    time: '',
    duration: '60', // minutes
    selectedCourses: []
  });
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
  const [deletingSlotId, setDeletingSlotId] = useState(null);

  useEffect(() => {
    fetchRequests();
    if (activeTab === 'availability') {
      fetchSlots();
    }
  }, [activeTab]);

  const fetchSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch('https://higherpolynomial-node.vercel.app/api/admin/doubt-slots');
      if (response.ok) {
        const data = await response.json();
        setSlots(data.slots || []);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://higherpolynomial-node.vercel.app/api/admin/doubt-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doubt requests:", error);
      setLoading(false);
    }
  };

  const handleOpenAcceptModal = (request) => {
    setSelectedRequest(request);
    setMeetLink('');

    if (request.slot_start_time) {
      const date = new Date(request.slot_start_time);
      // Ensure we format it correctly for datetime-local (YYYY-MM-DDTHH:MM)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const localIso = `${year}-${month}-${day}T${hours}:${minutes}`;
      setScheduledAt(localIso);
    } else {
      setScheduledAt('');
    }
    setIsAcceptModalOpen(true);
  };

  const handleConfirmAccept = async () => {
    if (!meetLink.trim()) {
      toast.warning("Please provide a Google Meet link");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/doubt-requests/${selectedRequest.id}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration, meetLink, scheduledAt })
      });

      if (response.ok) {
        toast.success("Doubt session scheduled and email sent!");
        setIsAcceptModalOpen(false);
        setMeetLink('');
        fetchRequests();
      } else {
        throw new Error("Failed to accept request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing request");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this request? An email notification will be sent.")) return;

    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/doubt-requests/${id}/reject`, {
        method: 'PATCH'
      });

      if (response.ok) {
        toast.success("Request rejected and email sent.");
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error rejecting request");
    }
  };

  const handleCreateSlot = async () => {
    if (!slotForm.date || !slotForm.time || slotForm.selectedCourses.length === 0) {
      toast.warning("Please select Date, Time, and at least one Course");
      return;
    }

    setIsCreatingSlot(true);
    try {
      const startDateTime = new Date(`${slotForm.date}T${slotForm.time}`);

      // Frontend Validation: No past dates
      if (startDateTime < new Date()) {
        toast.warning("Cannot create availability for a past date/time");
        setIsCreatingSlot(false);
        return;
      }

      const endDateTime = new Date(startDateTime.getTime() + parseInt(slotForm.duration) * 60000);

      const response = await fetch('https://higherpolynomial-node.vercel.app/api/admin/doubt-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          courseIds: slotForm.selectedCourses
        })
      });

      if (response.ok) {
        toast.success("Availability slot created successfully!");
        setSlotForm({ ...slotForm, selectedCourses: [] }); // Keep date/time for bulk creation but reset selection? Or reset all.
        fetchSlots(); // Refresh list
      } else {
        throw new Error("Failed to create slot");
      }
    } catch (error) {
      toast.error("Error creating slot");
      console.error(error);
    } finally {
      setIsCreatingSlot(false);
    }
  };

  const handleDeleteSlot = async (id) => {
    if (deletingSlotId !== id) {
      setDeletingSlotId(id);
      setTimeout(() => setDeletingSlotId(null), 3000); // Reset after 3 seconds
      return;
    }

    try {
      const response = await fetch(`https://higherpolynomial-node.vercel.app/api/admin/doubt-slots/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success("Slot deleted successfully");
        setDeletingSlotId(null);
        fetchSlots();
      } else {
        throw new Error("Failed to delete slot");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting slot");
    }
  };

  const toggleCourseSelection = (courseId) => {
    setSlotForm(prev => {
      const exists = prev.selectedCourses.includes(courseId);
      return {
        ...prev,
        selectedCourses: exists
          ? prev.selectedCourses.filter(id => id !== courseId)
          : [...prev.selectedCourses, courseId]
      };
    });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Doubt Sessions</h2>
          <p className="mt-2 text-gray-600">Manage student requests and your availability</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg p-1 border border-gray-200 flex">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${activeTab === 'requests' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Requests ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${activeTab === 'availability' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Manage Availability
          </button>
        </div>
      </div>

      {activeTab === 'requests' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Doubt Description</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Scheduled At</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Meet Link</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{request.user_name}</div>
                      <div className="text-xs text-gray-500">{request.user_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                        {request.course_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs truncate" title={request.doubt_description}>
                        {request.doubt_description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {request.scheduled_at ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-blue-600 uppercase">Confirmed:</span>
                          <span className="font-bold text-gray-900">{new Date(request.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      ) : (
                        request.slot_start_time ? (
                          <div className="flex flex-col text-orange-600">
                            <span className="font-bold text-xs uppercase">Requested:</span>
                            <span className="text-xs">{new Date(request.slot_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        ) : <span className="text-gray-400 italic">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {request.meet_link ? (
                        <a
                          href={request.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-sm transition"
                        >
                          <Video size={16} />
                          <span>Link</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Not provided</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {request.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleOpenAcceptModal(request)}
                              className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition shadow-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className={`text-xs font-black uppercase tracking-widest ${request.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                            {request.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-8 text-gray-500">No requests found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-black uppercase tracking-tight">Create Availability Slot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={slotForm.date}
                onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={slotForm.time}
                onChange={(e) => setSlotForm({ ...slotForm, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
              <select
                value={slotForm.duration}
                onChange={(e) => setSlotForm({ ...slotForm, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
              >
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="90">1.5 Hours</option>
                <option value="120">2 Hours</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Assign to Courses</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
              {Object.values(courses || {}).map(course => (
                <div
                  key={course.id}
                  onClick={() => toggleCourseSelection(course.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${slotForm.selectedCourses.includes(course.id)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
                    }`}
                >
                  <span className="text-sm font-bold truncate pr-2">{course.title}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${slotForm.selectedCourses.includes(course.id)
                    ? 'bg-white border-white text-blue-600'
                    : 'border-gray-200 group-hover:border-blue-300'
                    }`}>
                    {slotForm.selectedCourses.includes(course.id) && <Plus size={16} strokeWidth={3} />}
                  </div>
                </div>
              ))}
              {Object.keys(courses || {}).length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-gray-400 font-medium italic">No courses found. Please create a course first.</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleCreateSlot}
            disabled={isCreatingSlot}
            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 font-black uppercase tracking-widest text-sm mb-12"
          >
            {isCreatingSlot ? 'Publishing...' : 'Publish Availability'}
          </button>

          {/* Existing Slots Section */}
          <div className="border-t border-gray-100 pt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-black uppercase tracking-tight">Active Availability Slots</h3>

            {loadingSlots ? (
              <div className="text-center py-8 text-gray-500 italic">Loading slots...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {slots.map((slot) => (
                  <div key={slot.id} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-6">
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center min-w-[80px]">
                        <p className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Date</p>
                        <p className="font-bold text-gray-900">{new Date(slot.start_time).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center min-w-[80px]">
                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-wider">Start Time</p>
                        <p className="font-bold text-gray-900">{new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center min-w-[80px]">
                        <p className="text-[10px] font-black uppercase text-green-600 tracking-wider">Status</p>
                        <p className={`font-bold ${slot.is_booked ? 'text-red-600' : 'text-green-600'}`}>{slot.is_booked ? 'Booked' : 'Available'}</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-md">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Assigned Courses</p>
                      <p className="text-sm font-bold text-gray-700">{slot.courses || 'All Courses'}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className={`p-3 rounded-xl transition-all self-center flex items-center gap-2 ${deletingSlotId === slot.id
                        ? 'bg-red-600 text-white animate-pulse px-4'
                        : 'text-red-600 hover:bg-red-50'
                        }`}
                      title={deletingSlotId === slot.id ? "Confirm Delete" : "Delete Slot"}
                    >
                      {deletingSlotId === slot.id ? (
                        <>
                          <Trash2 size={18} />
                          <span className="text-xs font-bold uppercase">Confirm?</span>
                        </>
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </div>
                ))}
                {slots.length === 0 && (
                  <div className="text-center py-12 bg-gray-50/30 border border-dashed border-gray-200 rounded-2xl">
                    <p className="text-gray-400 font-medium italic">No active availability slots found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accept Modal */}
      {isAcceptModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Accept Request</h3>
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-50">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-500 tracking-wider">Scheduled Date</p>
                  <p className="font-bold text-gray-900 leading-none">
                    {scheduledAt ? new Date(scheduledAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-50">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-orange-500 tracking-wider">Session Time</p>
                  <p className="font-bold text-gray-900 leading-none">
                    {scheduledAt ? new Date(scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Google Meet Link</label>
              <input
                type="text"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://meet.google.com/..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="flex-1 px-6 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition"
              >
                Back
              </button>
              <button
                onClick={handleConfirmAccept}
                disabled={isProcessing}
                className="flex-[2] px-6 py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-200"
              >
                {isProcessing ? 'Scheduling...' : 'Schedule Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
