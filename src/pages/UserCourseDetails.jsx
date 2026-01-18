import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, FileText, ArrowLeft, BookOpen, Clock, Download } from 'lucide-react';

const UserCourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [activeLesson, setActiveLesson] = useState(null); // specific lesson video
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${id}`);
            if (!response.ok) throw new Error('Failed to load course');
            const data = await response.json();

            setCourse(data.course);
            setLessons(data.lessons || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Could not fetch course details');
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (error || !course) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
            <p className="text-xl font-semibold mb-4">{error || 'Course not found'}</p>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
                Back to Dashboard
            </button>
        </div>
    );

    // Determine what video to show: Active Lesson -> Course Promo URL -> None
    const currentVideoUrl = activeLesson ? activeLesson.video_url : course.video_url;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header / Nav */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 truncate max-w-lg">{course.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {course.category || 'Course'}
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Video Player & Description */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Video Player */}
                    <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video relative group">
                        {currentVideoUrl ? (
                            <video
                                src={currentVideoUrl}
                                controls
                                className="w-full h-full object-contain"
                                poster={!activeLesson && course.thumbnail ? course.thumbnail : undefined}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-900">
                                <PlayCircle size={64} className="mb-4 opacity-50" />
                                <p>Select a lesson to start learning</p>
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {activeLesson ? activeLesson.title : "Course Overview"}
                        </h2>
                        <div className="prose text-gray-600">
                            <p>{course.description}</p>
                        </div>

                        {/* PDF Notes Section */}
                        {course.notes_pdf && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <BookOpen size={20} className="mr-2 text-purple-600" />
                                    Course Material
                                </h3>
                                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText size={24} className="text-blue-500" />
                                        <div>
                                            <p className="font-medium text-gray-900">Course Notes (PDF)</p>
                                            <a
                                                href={course.notes_pdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                View / Download
                                            </a>
                                        </div>
                                    </div>
                                    <a
                                        href={course.notes_pdf}
                                        download
                                        className="p-2 hover:bg-blue-100 rounded-full text-blue-600 transition"
                                    >
                                        <Download size={20} />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Lessons List */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Course Content</h3>
                            <span className="text-xs text-gray-500 font-medium">{lessons.length} Lessons</span>
                        </div>

                        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="divide-y divide-gray-100">
                                {/* Promo/Intro Item */}
                                <button
                                    onClick={() => setActiveLesson(null)}
                                    className={`w-full text-left p-4 hover:bg-gray-50 transition flex items-start gap-3 ${!activeLesson ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
                                >
                                    <div className={`mt-1 ${!activeLesson ? 'text-purple-600' : 'text-gray-400'}`}>
                                        <PlayCircle size={18} />
                                    </div>
                                    <div>
                                        <span className={`block font-medium ${!activeLesson ? 'text-purple-900' : 'text-gray-700'}`}>
                                            Introduction & Promo
                                        </span>
                                        <span className="text-xs text-gray-500">Overview</span>
                                    </div>
                                </button>

                                {/* Lesson Items */}
                                {lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLesson(lesson)}
                                        className={`w-full text-left p-4 hover:bg-gray-50 transition flex items-start gap-3 ${activeLesson?.id === lesson.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
                                    >
                                        <div className={`mt-1 ${activeLesson?.id === lesson.id ? 'text-purple-600' : 'text-gray-400'}`}>
                                            <PlayCircle size={18} />
                                        </div>
                                        <div>
                                            <span className={`block font-medium ${activeLesson?.id === lesson.id ? 'text-purple-900' : 'text-gray-700'}`}>
                                                {index + 1}. {lesson.title}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <Clock size={12} /> {lesson.duration || 'Video'}
                                            </span>
                                        </div>
                                    </button>
                                ))}

                                {lessons.length === 0 && (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No extra lessons added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserCourseDetails;
