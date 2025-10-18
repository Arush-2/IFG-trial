import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, BookOpen, Trophy, GraduationCap, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ArcadeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  created_at: string;
}

const InnovationArcade: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'skill_drops' | 'competitions' | 'courses'>('projects');
  const [projects, setProjects] = useState<ArcadeItem[]>([]);
  const [skillDrops, setSkillDrops] = useState<ArcadeItem[]>([]);
  const [competitions, setCompetitions] = useState<ArcadeItem[]>([]);
  const [courses, setCourses] = useState<ArcadeItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchArcadeData();
    }
  }, [user, activeTab]);

  const fetchArcadeData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProjects([]);
      setSkillDrops([]);
      setCompetitions([]);
      setCourses([]);
    } catch (error) {
      console.error('Error fetching arcade data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Lightbulb },
    { id: 'skill_drops', label: 'Skill Drops', icon: BookOpen },
    { id: 'competitions', label: 'Competitions', icon: Trophy },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'projects': return projects;
      case 'skill_drops': return skillDrops;
      case 'competitions': return competitions;
      case 'courses': return courses;
      default: return [];
    }
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-white/10 mb-6 animate-float-slow">
        {activeTab === 'projects' && <Lightbulb className="w-10 h-10 text-yellow-400" />}
        {activeTab === 'skill_drops' && <BookOpen className="w-10 h-10 text-yellow-400" />}
        {activeTab === 'competitions' && <Trophy className="w-10 h-10 text-yellow-400" />}
        {activeTab === 'courses' && <GraduationCap className="w-10 h-10 text-yellow-400" />}
      </div>
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-flow mb-3">
        {type} Coming Soon
      </h3>
      <p className="text-gray-300 max-w-md mx-auto text-lg">
        We're working on bringing you amazing {type.toLowerCase()}. Check back soon for updates!
      </p>
    </div>
  );

  const LockedOverlay = () => (
    <div className="fixed inset-0 bg-gradient-to-b from-[#020617]/95 via-[#08122B]/95 to-[#0A1833]/95 backdrop-blur-md z-40 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400/20 to-white/10 mb-8 animate-pulse-glow">
          <Lock className="w-12 h-12 text-yellow-400" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-flow mb-4">
          Login to Explore the Arcade
        </h2>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Create an account or sign in to access the Innovation Arcade and discover projects, skill drops, competitions, and courses from Gen Z innovators worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 rounded-full font-semibold text-lg text-gray-900 bg-gradient-to-r from-yellow-400 to-white bg-[length:200%_200%] animate-gradient-x shadow-lg hover:shadow-[0_0_25px_rgba(255,255,200,0.4)] hover:scale-105 transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="px-8 py-4 rounded-full font-semibold text-lg text-gray-900 bg-gradient-to-r from-white to-yellow-400 bg-[length:200%_200%] animate-gradient-x shadow-lg hover:shadow-[0_0_25px_rgba(255,255,200,0.4)] hover:scale-105 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#020617] via-[#08122B] to-[#0A1833] text-white relative overflow-hidden pt-24 pb-16">
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors mb-6 hover-scale"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-flow mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Innovation Arcade
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
              Explore the creativity, collaboration, and impact of Gen Z innovators
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-yellow-300/20 rounded-2xl p-4 sm:p-8 shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:shadow-[0_0_45px_rgba(255,215,0,0.25)] transition-all animate-fade-in">
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 border-b border-yellow-400/20 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-400 to-white text-gray-900 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
              </div>
            ) : getCurrentData().length === 0 ? (
              <EmptyState type={tabs.find(t => t.id === activeTab)?.label || ''} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentData().map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,200,0.15)] transition-all hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-flow mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-gray-400 text-sm">
            Have a project or idea to share?{' '}
            <Link to="/dashboard" className="text-yellow-400 hover:text-yellow-300 font-medium underline">
              Visit your dashboard
            </Link>
          </p>
        </div>
      </div>

      {!user && <LockedOverlay />}
    </section>
  );
};

export default InnovationArcade;
