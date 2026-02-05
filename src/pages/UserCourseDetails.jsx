import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, FileText, ArrowLeft, BookOpen, Clock, Download, ChevronDown, ChevronRight, List } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';
import AvailabilitySlotSelector from '../components/AvailabilitySlotSelector';

import { toast } from 'react-toastify';
import Hls from 'hls.js';

const UserCourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = React.useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('course'); // 'course', 'playlist', 'video'
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
    const [doubtDescription, setDoubtDescription] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
    const [watermarkPos, setWatermarkPos] = useState({ top: '10%', left: '10%' });
    const videoRef = React.useRef(null);

    // Custom Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [showControls, setShowControls] = useState(true);
    let controlsTimeout = null;

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (e) => {
        const val = parseFloat(e.target.value);
        videoRef.current.currentTime = val;
        setCurrentTime(val);
    };

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    };

    // 🛡️ Dynamic Watermark Movement
    useEffect(() => {
        const interval = setInterval(() => {
            setWatermarkPos({
                top: `${Math.floor(Math.random() * 80 + 5)}%`,
                left: `${Math.floor(Math.random() * 70 + 5)}%`
            });
        }, 5000); // Move every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // 🛡️ HLS & BLOB Initialization
    useEffect(() => {
        let blobUrl = null;
        if (currentView === 'video' && activeLesson?.video_url && videoRef.current) {
            const video = videoRef.current;
            const videoUrl = activeLesson.video_url;

            if (videoUrl.includes('.m3u8')) {
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(videoUrl);
                    hls.attachMedia(video);
                    return () => hls.destroy();
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = videoUrl;
                }
            } else {
                // MP4 Hardening: Fetch as blob to hide raw URL from DOM
                // This prevents easy 'right-click copy link' or 'IDM sniff'
                const loadAsBlob = async () => {
                    try {
                        setIsBuffering(true);
                        const response = await fetch(videoUrl);
                        const blob = await response.blob();
                        blobUrl = URL.createObjectURL(blob);
                        video.src = blobUrl;
                        setIsBuffering(false);
                    } catch (err) {
                        console.error("Blob loading failed, falling back to direct URL", err);
                        video.src = videoUrl;
                        setIsBuffering(false);
                    }
                };
                loadAsBlob();
            }
        }
        return () => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, [currentView, activeLesson]);

    useEffect(() => {
        fetchCourseDetails();

        // 🛡️ Global Security: Prevent keyboard shortcuts
        const handleKeyDown = (e) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p'))
            ) {
                e.preventDefault();
                return false;
            }
        };

        // 🛡️ Global Security: Prevent Right Click
        const handleContextMenu = (e) => e.preventDefault();
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);

        // 🛡️ ANTI-IDM WATCHDOG: Actively remove injected download buttons
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Common IDM selectors/patterns
                        if (
                            node.id?.toLowerCase().includes('idm') ||
                            node.className?.toLowerCase()?.includes?.('idm') ||
                            node.tagName === 'IDM-DOWNLOAD-BAR'
                        ) {
                            node.remove();
                        }
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
            observer.disconnect();
        };
    }, [id]);

    const handleDoubtSubmit = async () => {
        if (!doubtDescription.trim()) return;

        setIsSubmittingDoubt(true);
        try {
            const response = await fetch('https://higherpolynomial-node.vercel.app/api/doubt-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: user?.name || 'Anonymous',
                    userEmail: user?.email || 'No email',
                    courseName: course?.title,
                    doubtDescription: doubtDescription,
                    slotId: selectedSlotId
                }),
            });

            if (response.ok) {
                toast.success('Doubt request sent successfully!');
                setIsDoubtModalOpen(false);
                setDoubtDescription('');
                setSelectedSlotId(null);
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to send doubt request');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error sending doubt request. Please try again.');
        } finally {
            setIsSubmittingDoubt(false);
        }
    };

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`https://higherpolynomial-node.vercel.app/api/courses/${id}`);
            if (!response.ok) throw new Error('Failed to load course');
            const data = await response.json();

            setCourse(data.course);
            setPlaylists(data.playlists || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Could not fetch course details');
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error || !course) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
            <p className="text-xl font-semibold mb-4">{error || 'Course not found'}</p>
            <button
                onClick={() => navigate('/courses')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Back to Courses
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 🛡️ Global Style Overrides for Protection */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-select {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                video::-webkit-media-controls-enclosure {
                    overflow: hidden;
                }
                video::-webkit-media-controls-panel {
                    /* Removed shift that was cutting off fullscreen button */
                }
            `}} />

            {/* Header / Nav */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (currentView === 'video') setCurrentView('playlist');
                                else if (currentView === 'playlist') setCurrentView('course');
                                else navigate('/courses');
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 truncate max-w-lg">
                                {currentView === 'course' ? course.title : (currentView === 'playlist' ? selectedPlaylist.title : activeLesson.title)}
                            </h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="hover:underline cursor-pointer" onClick={() => setCurrentView('course')}>Course</span>
                                {currentView !== 'course' && (
                                    <>
                                        <span>/</span>
                                        <span className={`hover:underline cursor-pointer ${currentView === 'playlist' ? 'font-bold text-blue-600' : ''}`} onClick={() => setCurrentView('playlist')}>
                                            {selectedPlaylist?.title}
                                        </span>
                                    </>
                                )}
                                {currentView === 'video' && (
                                    <>
                                        <span>/</span>
                                        <span className="font-bold text-blue-600 truncate max-w-[150px]">{activeLesson?.title}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        {isAuthenticated && (
                            <button
                                onClick={() => setIsDoubtModalOpen(true)}
                                className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                Request Doubt Session
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Doubt Request Modal */}
            {
                isDoubtModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">Request Doubt Session</h3>
                                <button onClick={() => setIsDoubtModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                                    <ArrowLeft className="rotate-90" size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Availability Slot</label>
                                    <AvailabilitySlotSelector courseId={id} onSelect={(slotId) => setSelectedSlotId(slotId)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Describe your doubt</label>
                                    <textarea
                                        value={doubtDescription}
                                        onChange={(e) => setDoubtDescription(e.target.value)}
                                        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Tell us what you're struggling with..."
                                    ></textarea>
                                </div>
                                <button
                                    onClick={handleDoubtSubmit}
                                    disabled={isSubmittingDoubt || !doubtDescription.trim() || !selectedSlotId}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                                >
                                    {isSubmittingDoubt ? 'Sending...' : 'Send Request'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <main className="flex-1 max-w-5xl w-full mx-auto p-4 lg:p-8">

                {/* 1. COURSE VIEW */}
                {currentView === 'course' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Course Header Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="aspect-video md:aspect-[3/1] bg-gray-200">
                                {course.thumbnail && <img src={course.thumbnail} className="w-full h-full object-cover" />}
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {course.category || 'General'}
                                    </span>
                                </div>
                                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{course.title}</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">{course.description}</p>

                                {course.notes_pdf && (
                                    <a href={course.notes_pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline bg-blue-50 px-4 py-2 rounded-lg">
                                        <FileText size={20} />
                                        Download Course Guide (PDF)
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Playlists List */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <BookOpen className="text-blue-600" />
                                Course Content
                                <span className="text-sm font-normal text-gray-500">({playlists.length} Playlists)</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {playlists.map((playlist, idx) => (
                                    <div
                                        key={playlist.id}
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                navigate('/login');
                                                return;
                                            }
                                            setSelectedPlaylist(playlist);
                                            setCurrentView('playlist');
                                        }}
                                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                                                {idx + 1}
                                            </div>
                                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                                {playlist.videos?.length || 0} Videos
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{playlist.title}</h4>
                                        <p className="text-gray-500 text-sm line-clamp-2">{playlist.description}</p>
                                        <div className="mt-4 flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                            Explore Playlist <ChevronRight size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. PLAYLIST VIEW */}
                {currentView === 'playlist' && selectedPlaylist && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-300">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">{selectedPlaylist.title}</h2>
                                <p className="text-gray-600 mt-2 max-w-2xl">{selectedPlaylist.description}</p>
                            </div>
                            <button
                                onClick={() => setCurrentView('course')}
                                className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                            >
                                <ArrowLeft size={16} /> Back to Course
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {selectedPlaylist.videos?.map((video, idx) => (
                                    <div
                                        key={video.id}
                                        onClick={() => {
                                            setActiveLesson(video);
                                            setCurrentView('video');
                                        }}
                                        className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {video.thumbnail && <img src={video.thumbnail} className="w-full h-full object-cover" />}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                                <PlayCircle size={24} className="text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                                <span className="text-gray-400 text-sm font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                                                {video.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 truncate mt-1">{video.description}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Clock size={12} /> {video.duration || '00:00'}
                                                </span>
                                                {video.notes_pdf && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                                                        <FileText size={12} /> Notes Included
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. VIDEO PLAYER VIEW */}
                {currentView === 'video' && activeLesson && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-300">
                        {/* Player Container */}
                        <div
                            className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative ring-1 ring-white/10 group"
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {isAuthenticated ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        // 🛡️ NO CONTROLS - Blocks most extensions from hooking in
                                        disablePictureInPicture
                                        disableRemotePlayback
                                        onContextMenu={(e) => e.preventDefault()}
                                        className="w-full h-full object-contain pointer-events-none" // 🛡️ Pointer events none makes it invisible to clicks
                                        poster={activeLesson.thumbnail || course.thumbnail}
                                        autoPlay
                                        style={{ userSelect: 'none' }}
                                        onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
                                        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onWaiting={() => setIsBuffering(true)}
                                        onPlaying={() => setIsBuffering(false)}
                                    >
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* 🛡️ TRANSPARENT SHIELD - Catch interactions and blockSniffers */}
                                    <div
                                        className="absolute inset-x-0 top-0 bottom-20 z-[1] bg-transparent cursor-default pointer-events-auto"
                                        onContextMenu={(e) => e.preventDefault()}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePlay();
                                        }}
                                        title=""
                                    />

                                    {/* 🛡️ KEYBOARD SHORTCUTS HANDLER */}
                                    <div
                                        tabIndex="0"
                                        className="absolute inset-0 focus:outline-none pointer-events-none z-[2]"
                                        onKeyDown={(e) => {
                                            if (!videoRef.current) return;
                                            if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
                                            if (e.key === ' ' || e.key === 'k') togglePlay();
                                            if (e.key === 'ArrowRight' || e.key === 'l') videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
                                            if (e.key === 'ArrowLeft' || e.key === 'j') videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                                            if (e.key === 'f') {
                                                const container = videoRef.current.parentElement;
                                                if (document.fullscreenElement) document.exitFullscreen();
                                                else container.requestFullscreen();
                                            }
                                        }}
                                    />

                                    {/* 🛡️ BUFFERING OVERLAY */}
                                    {isBuffering && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-[8]">
                                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                        </div>
                                    )}

                                    {/* 🛡️ CUSTOM CONTROL BAR */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[20] transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <div className="relative mb-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration || 0}
                                                value={currentTime}
                                                onChange={handleProgress}
                                                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-600 hover:h-2 transition-all"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <button onClick={togglePlay} className="text-white hover:text-blue-400 transition text-xl">
                                                    {isPlaying ? '⏸' : '▶'}
                                                </button>
                                                <div className="text-white text-xs font-mono">
                                                    {formatTime(currentTime)} / {formatTime(duration)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const container = videoRef.current.parentElement;
                                                    if (document.fullscreenElement) document.exitFullscreen();
                                                    else container.requestFullscreen();
                                                }}
                                                className="text-white hover:text-blue-400 transition text-xl"
                                            >
                                                ⛶
                                            </button>
                                        </div>
                                    </div>

                                    {/* 🛡️ MOVING WATERMARK - Prevents useful screen recording */}
                                    <div
                                        className="absolute bg-white/10 backdrop-blur-sm text-white/40 px-3 py-1 rounded-full text-[10px] md:text-xs font-mono pointer-events-none select-none z-[10] transition-all duration-1000 ease-in-out border border-white/5"
                                        style={{
                                            top: watermarkPos.top,
                                            left: watermarkPos.left,
                                            userSelect: 'none'
                                        }}
                                    >
                                        {user?.email || 'Protected Content'} • {new Date().toLocaleDateString()}
                                    </div>

                                    {/* 🛡️ INVISIBLE LOGO OVERLAY - Deterrent */}
                                    <div className="absolute top-4 left-4 opacity-20 pointer-events-none select-none z-[5]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black italic">Q</div>
                                            <span className="text-white font-bold text-sm tracking-tight">HigherPolynomial</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm p-6 text-center space-y-6">
                                    <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30">
                                        <PlayCircle size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ready to start learning?</h3>
                                        <p className="text-gray-400 font-medium max-w-sm">Please log in or create an account to access this lesson and start your path to mastery.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                        >
                                            Login to Watch
                                        </button>
                                        <button
                                            onClick={() => navigate('/signup')}
                                            className="px-8 py-3 bg-white/10 text-white font-black rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Video Meta & Description */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                            {selectedPlaylist?.title}
                                        </span>
                                        <span className="text-sm text-gray-400">Lesson {selectedPlaylist?.videos?.findIndex(v => v.id === activeLesson.id) + 1}</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-gray-900">{activeLesson.title}</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">{activeLesson.description}</p>
                                </div>

                                <div className="flex flex-col gap-3 min-w-[240px]">
                                    {activeLesson.notes_pdf && (
                                        <a
                                            href={activeLesson.notes_pdf}
                                            download
                                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                                        >
                                            <Download size={20} /> Download PDF Notes
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setCurrentView('playlist')}
                                        className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                                    >
                                        <List size={20} className="text-blue-600" /> View Playlist
                                    </button>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                {(() => {
                                    const currentIndex = selectedPlaylist.videos.findIndex(v => v.id === activeLesson.id);
                                    const prevVideo = selectedPlaylist.videos[currentIndex - 1];
                                    const nextVideo = selectedPlaylist.videos[currentIndex + 1];

                                    return (
                                        <>
                                            {prevVideo ? (
                                                <button
                                                    onClick={() => setActiveLesson(prevVideo)}
                                                    className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
                                                >
                                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Previous</span>
                                                    <span className="font-bold text-gray-900 flex items-center gap-1 group">
                                                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {prevVideo.title}
                                                    </span>
                                                </button>
                                            ) : <div />}

                                            {nextVideo ? (
                                                <button
                                                    onClick={() => setActiveLesson(nextVideo)}
                                                    className="flex flex-col items-end gap-1 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
                                                >
                                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Next</span>
                                                    <span className="font-bold text-gray-900 flex items-center gap-1 group">
                                                        {nextVideo.title} <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </button>
                                            ) : <div />}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div >
    );
};

export default UserCourseDetails;
