import { useState, createContext, useContext } from 'react';
import { Upload, Plus, Trash2, Eye, BookOpen, Video, FileText, DollarSign, Tag, User } from 'lucide-react';

// Context for managing courses globally
const CourseContext = createContext();

function CourseProvider({ children }) {
  const [courses, setCourses] = useState({});

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
    <CourseContext.Provider value={{ courses, addCourse, updateCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

function useCourses() {
  return useContext(CourseContext);
}

// Main App Component with Routing
export default function App() {
  const [currentPage, setCurrentPage] = useState('create');
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const navigate = (page, courseId = null) => {
    setCurrentPage(page);
    setCurrentCourseId(courseId);
  };

  return (
    <CourseProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-purple-600">EduLearn Admin</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('create')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPage === 'create' && <CreateCoursePage navigate={navigate} />}
          {currentPage === 'videos' && <UploadVideosPage courseId={currentCourseId} navigate={navigate} />}
          {currentPage === 'preview' && <CoursePreviewPage courseId={currentCourseId} navigate={navigate} />}
        </main>
      </div>
    </CourseProvider>
  );
}

// Create Course Component
function CreateCoursePage({ navigate }) {
  const { addCourse } = useCourses();
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
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('createdBy', 'Admin'); // Hardcoded or from context

        if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);
        if (formData.promoVideo) data.append('video', formData.promoVideo); // backend expects 'video'
        if (formData.notes) data.append('notes', formData.notes);

        // Replace with your actual backend URL
        const response = await fetch('http://localhost:3000/api/courses', {
          method: 'POST',
          body: data,
        });

        if (!response.ok) {
          throw new Error('Failed to create course');
        }

        const result = await response.json();
        const courseId = result.courseId;

        // Add to local context (optional, or fetch fresh list)
        // We'll construct a local object to keep UI responsive without full re-fetch if desired
        const newCourse = {
          id: courseId,
          ...formData,
          createdBy: 'Admin',
          createdAt: new Date().toISOString(),
          lessons: [],
          // Store URLs if returned, otherwise we just have the files locally for now
          thumbnailUrl: result.urls?.thumbnail,
          videoUrl: result.urls?.video,
          notesUrl: result.urls?.notes
        };

        addCourse(newCourse);
        navigate('videos', courseId);
      } catch (error) {
        console.error("Error creating course:", error);
        alert("Failed to create course. See console for details.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create New Course</h2>
        <p className="mt-2 text-gray-600">Fill in the details to create a new course</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
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
                    <Video className="text-purple-600" size={24} />
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
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Create Course & Add Videos
          </button>
        </div>
      </div>
    </div>
  );
}

// Upload Videos Component
function UploadVideosPage({ courseId, navigate }) {
  const { courses, updateCourse } = useCourses();
  const course = courses[courseId];
  const [lessons, setLessons] = useState(course?.lessons || []);
  const [newLesson, setNewLesson] = useState({ title: '', video: null });
  const [uploadProgress, setUploadProgress] = useState({});

  const handleAddLesson = async () => {
    if (newLesson.title && newLesson.video) {
      const lessonId = Date.now(); // Temp ID for UI until saved

      // Initial UI update
      setUploadProgress(prev => ({ ...prev, [lessonId]: 0 }));

      try {
        const formData = new FormData();
        formData.append('courseId', courseId);
        formData.append('title', newLesson.title);
        formData.append('duration', '00:00'); // Valid duration calculation requires getting metadata from file
        formData.append('video', newLesson.video);

        // Fake progress for visual feedback because basic fetch doesn't support progress events easily
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[lessonId] || 0;
            return current < 90 ? { ...prev, [lessonId]: current + 10 } : prev;
          });
        }, 500);

        const response = await fetch('http://localhost:3000/api/admin/upload-video', {
          method: 'POST',
          body: formData
        });

        clearInterval(interval);

        if (!response.ok) throw new Error('Upload failed');

        const result = await response.json();

        setUploadProgress(prev => ({ ...prev, [lessonId]: 100 }));

        const lesson = {
          id: result.id || lessonId, // Use backend ID if returned, else temp
          title: newLesson.title,
          videoFile: newLesson.video.name,
          videoUrl: result.videoUrl,
          duration: result.duration || '00:00'
        };

        setLessons(prev => [...prev, lesson]);
        setNewLesson({ title: '', video: null });

        // Update global store context
        const updatedCourse = { ...course, lessons: [...(course.lessons || []), lesson] };
        updateCourse(courseId, { lessons: updatedCourse.lessons });

      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload video");
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[lessonId];
          return newProgress;
        });
      }
    }
  };

  const handleRemoveLesson = (lessonId) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[lessonId];
      return newProgress;
    });
  };

  const handleFinish = () => {
    updateCourse(courseId, { lessons });
    navigate('preview', courseId);
  };

  if (!course) {
    return <div className="text-center py-12">Course not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upload Course Videos</h2>
        <p className="mt-2 text-gray-600">Course: {course.title}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Add Lesson */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Lesson</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
              <input
                type="text"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Introduction to React Hooks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setNewLesson(prev => ({ ...prev, video: e.target.files[0] }))}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Choose Video
                </label>
                {newLesson.video && (
                  <span className="text-sm text-gray-600">{newLesson.video.name}</span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddLesson}
              disabled={!newLesson.title || !newLesson.video}
              className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus size={20} className="mr-2" />
              Add Lesson
            </button>
          </div>
        </div>

        {/* Lessons List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Course Lessons ({lessons.length})</h3>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Video size={14} className="mr-1" />
                            {lesson.videoFile}
                          </span>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>

                    {uploadProgress[lesson.id] !== undefined && uploadProgress[lesson.id] < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[lesson.id]}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress[lesson.id]}%</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveLesson(lesson.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {lessons.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No lessons added yet. Add your first lesson above.
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <button
            onClick={() => navigate('create')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back to Course Details
          </button>
          <button
            onClick={handleFinish}
            disabled={lessons.length === 0}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Finish & Preview Course
          </button>
        </div>
      </div>
    </div>
  );
}

// Course Preview Component
function CoursePreviewPage({ courseId, navigate }) {
  const { courses } = useCourses();
  const course = courses[courseId];

  if (!course) {
    return <div className="text-center py-12">Course not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Course Preview</h2>
          <p className="mt-2 text-gray-600">Review your course before publishing</p>
        </div>
        <button
          onClick={() => navigate('create')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Create Another Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Course Header */}
        <div className="relative h-80 bg-gray-900">
          {course.thumbnail && (
            <img
              src={URL.createObjectURL(course.thumbnail)}
              alt={course.title}
              className="w-full h-full object-cover opacity-90"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 bg-purple-600 rounded-full text-sm font-medium mb-3">
                {course.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-xl text-gray-200">Created by {course.createdBy}</p>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Course</h3>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>

              {course.promoVideo && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Video className="text-purple-600" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">Promotional Video</p>
                      <p className="text-sm text-gray-600">{course.promoVideo.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {course.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-600" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">Course Notes</p>
                      <p className="text-sm text-gray-600">{course.notes.name}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Course Content</h3>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-full font-semibold">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{lesson.title}</p>
                          <p className="text-sm text-gray-500">{lesson.videoFile}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                        <Video size={20} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-2">Course Price</p>
                  <p className="text-4xl font-bold text-purple-600">${course.price}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Lessons</span>
                    <span className="font-semibold">{course.lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold">{course.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Instructor</span>
                    <span className="font-semibold">{course.createdBy}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                  Publish Course
                </button>

                <button
                  onClick={() => navigate('videos', courseId)}
                  className="w-full mt-3 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Edit Lessons
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}