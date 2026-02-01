import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Star, PlayCircle, GraduationCap, Settings, Layout as LayoutIcon, ChevronRight } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];

  if (loading) return (
    <div className="flex justify-center items-center py-20 min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block font-bold">
        {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* 1. Welcome & Stats Section (Only for Auth Users) */}
      {isAuthenticated ? (
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0f172a] p-10 shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-blue-600/30 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">Student Portal</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Welcome back, <br /><span className="text-blue-400 italic">{user?.name || 'Explorer'}!</span>
              </h1>
              <p className="text-gray-300 text-lg font-medium max-w-md">
                Ready to continue your learning journey? You have courses waiting for you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <p className="text-white text-xl font-black">12</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">Active Courses</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Star size={24} />
                </div>
                <p className="text-white text-xl font-black">4.8</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Explore Our <span className="text-blue-600">Courses</span></h1>
          <p className="text-gray-500 font-medium">Build your skills with the best expert-led content.</p>
        </div>
      )}

      {/* 2. Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative w-full lg:w-[400px] group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="What do you want to learn today?"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto px-1 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Course Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <LayoutIcon className="text-blue-600" />
            Available Courses
          </h2>
          <span className="text-sm font-bold text-gray-400">{filteredCourses.length} results</span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <BookOpen size={64} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight shadow-sm">
                      {course.category || 'General'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Course <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                    <span className="flex items-center gap-1"><PlayCircle size={14} className="text-blue-500" /> 12 Lessons</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-orange-500" /> 8h 30m</span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed flex-1">
                    {course.description}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                      <Star size={16} fill="currentColor" />
                      <span>4.8</span>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl font-black text-lg">
                      ${course.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-300" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase">Nothing found</h3>
            <p className="text-gray-500 font-medium mt-2">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-6 text-blue-600 font-black hover:underline underline-offset-8"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Quick Access Section (Only for Auth Users) */}
      {isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <GraduationCap size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">My Learning</h4>
              <p className="text-gray-500 font-medium">Continue where you left off</p>
            </div>
            <ChevronRight className="ml-auto text-gray-300 group-hover:text-gray-900 transform group-hover:translate-x-2 transition-all" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-orange-50 rounded-[1.5rem] flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <Settings size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Settings</h4>
              <p className="text-gray-500 font-medium">Manage your profile & preferences</p>
            </div>
            <ChevronRight className="ml-auto text-gray-300 group-hover:text-gray-900 transform group-hover:translate-x-2 transition-all" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;