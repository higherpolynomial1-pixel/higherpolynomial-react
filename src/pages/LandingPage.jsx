import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, GraduationCap, Star, BookOpen, Brain, TrendingUp, Cpu, PieChart, Activity, Globe, Download, PlayCircle, Users, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const featuredCourses = [
        { id: 1, title: 'Introduction to Artificial Intelligence', category: 'Technology', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60' },
        { id: 2, title: 'Advanced Algebra Made Simple', category: 'Mathematics', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60' },
        { id: 3, title: 'Full-Stack Web Development', category: 'Technology', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60' },
        { id: 4, title: 'Data Analysis with Python', category: 'Business', image: 'https://images.unsplash.com/photo-1551288049-bb848a55a178?w=800&auto=format&fit=crop&q=60' },
    ];

    const categories = [
        { name: 'Technology & Programming', icon: <Cpu />, desc: 'AI, Data Science, Web & Mobile Development' },
        { name: 'Mathematics & Logic', icon: <Brain />, desc: 'Algebra, Calculus, Discrete Math' },
        { name: 'Business & Finance', icon: <TrendingUp />, desc: 'Entrepreneurship, Marketing, Economics' },
        { name: 'Science & Engineering', icon: <Activity />, desc: 'Physics, Electronics, Applied Sciences' },
        { name: 'Personal Growth', icon: <Users />, desc: 'Productivity, Critical Thinking' },
    ];

    return (
        <div className="bg-white">

            {/* 1. Hero Section */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-bl-[200px] -z-10 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-bold animate-fade-in">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                </span>
                                Now Live: New AI & Calculus Courses
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                                Learn <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Smarter.</span> <br />
                                Think <span className="text-blue-600">Deeper.</span> <br />
                                Grow <span className="text-pink-500">Faster.</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                Master in-demand skills with expert-led courses, hands-on projects, and learning paths designed for real-world success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 hover:-translate-y-1 transition-all"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => navigate('/courses')}
                                    className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 font-black rounded-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all"
                                >
                                    Browse Courses
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl animate-float">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80" alt="Learning" className="w-full h-auto" />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Sub-Hero / Value Prop */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Structured for Your Success</h2>
                        <p className="text-lg text-gray-600 font-medium">Whether you’re a student, professional, or lifelong learner, HigherPolynomia helps you build knowledge that compounds—step by step.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: 'University-level concepts', desc: 'Deep dives into theory that actually matters.', icon: <GraduationCap className="w-10 h-10 text-blue-600" /> },
                            { title: 'Practical, skill-focused', desc: 'Apply what you learn with real projects.', icon: <Brain className="w-10 h-10 text-blue-600" /> },
                            { title: 'Career-driven outcomes', desc: 'Build a portfolio that employers value.', icon: <TrendingUp className="w-10 h-10 text-pink-500" /> },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Featured Categories */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
                        <div className="space-y-4">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-black uppercase tracking-widest text-sm">Our Portfolio</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Explore What You Can Learn</h2>
                        </div>
                        <button onClick={() => navigate('/courses')} className="text-blue-600 font-black flex items-center gap-2 hover:translate-x-2 transition-transform">
                            View all categories <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="p-8 rounded-[2.5rem] bg-gray-50 hover:bg-[#0f172a] hover:text-white transition-all duration-300 group cursor-pointer">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-3">{cat.name}</h3>
                                <p className="text-gray-500 group-hover:text-gray-400 font-medium">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Why HigherPolynomia */}
            <section className="py-24 bg-[#0f172a] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black leading-tight">More than courses— <br /><span className="text-blue-400">this is structured growth.</span></h2>
                            </div>
                            <div className="space-y-6">
                                {[
                                    'Expert-created content',
                                    'Learn at your own pace',
                                    'Hands-on exercises & quizzes',
                                    'Certificates of completion',
                                    'Access anytime, anywhere'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all">
                                            <CheckCircle size={16} />
                                        </div>
                                        <span className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-4 mt-10">
                                <Globe className="text-blue-400" size={40} />
                                <h4 className="text-2xl font-black">Global Access</h4>
                                <p className="text-gray-400 text-sm font-medium">Join 50,000+ students worldwide.</p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-4">
                                <Star className="text-yellow-400" size={40} />
                                <h4 className="text-2xl font-black">Top Ratings</h4>
                                <p className="text-gray-400 text-sm font-medium">Highly recommended by peers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Learning Experience Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Designed for Focused Learning</h2>
                        <p className="text-xl text-gray-500 font-medium">Everything you need to master new topics is right here.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 font-sans">
                        {[
                            { name: 'Short Lessons', icon: <PlayCircle />, color: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' },
                            { name: 'Progress Tracking', icon: <Activity />, color: 'bg-blue-100 text-blue-600' },
                            { name: 'Resources', icon: <Download />, color: 'bg-green-100 text-green-600' },
                            { name: 'Examples', icon: <BookOpen />, color: 'bg-pink-100 text-pink-600' },
                            { name: 'Community', icon: <Users />, color: 'bg-orange-100 text-orange-600' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <span className="font-black text-gray-900 text-center uppercase tracking-tight text-sm">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Featured Courses */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-gray-900">Popular Right Now</h2>
                            <p className="text-lg text-gray-500 font-medium">Start with our highest-rated learning materials.</p>
                        </div>
                        <button onClick={() => navigate('/courses')} className="hidden sm:flex items-center gap-2 font-black text-blue-600">
                            Browse all <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 cursor-pointer hover:-translate-y-2">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider shadow-sm">{course.category}</span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <h3 className="text-lg font-black text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                    <div className="flex items-center gap-1.5 text-yellow-500">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-gray-400 text-sm font-bold ml-1">5.0</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Testimonials */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-black uppercase tracking-widest text-sm">Success Stories</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">See what our students are saying</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-gray-500 font-bold ml-2">Join 10k+ happy learners</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 rounded-[3rem] text-white shadow-2xl relative z-10">
                                <p className="text-2xl font-bold italic leading-relaxed mb-8">"HigherPolynomia helped me finally understand complex topics without feeling overwhelmed. The structure and depth are better than most online platforms I've tried."</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20">
                                        <img src="https://i.pravatar.cc/150?u=5" alt="Student" />
                                    </div>
                                    <div>
                                        <p className="font-black uppercase tracking-tight">Ankit Learner</p>
                                        <p className="text-blue-200 text-sm font-medium">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 right-10 w-full h-full bg-blue-600 rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Call to Action */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-[3rem] p-12 lg:p-20 text-center text-white relative shadow-2xl shadow-blue-600/40 overflow-hidden">
                    <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-white/10 blur-[100px] rounded-full"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl lg:text-6xl font-black">Start Learning Today</h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">Join thousands of learners building skills that matter. Your journey to mastery begins here.</p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-12 py-5 bg-white text-blue-700 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform"
                        >
                            Create Your Free Account
                        </button>
                    </div>
                </div>
            </section>

            {/* 9. Footer Tagline */}
            <footer className="py-12 border-t border-gray-100 text-center">
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] font-mono">HigherPolynomia — Knowledge, Elevated.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
