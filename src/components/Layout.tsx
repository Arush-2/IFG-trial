import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, LayoutDashboard, Home, Info, Mail, Gamepad2 } from 'lucide-react';
import Header from './Header';
import ChatBot from './ChatBot';
import { useAuth } from '../contexts/AuthContext'; // <-- to check if logged in

const Layout: React.FC = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls sidebar visibility
  const { user } = useAuth(); // <-- get user state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/user copy.jpg"
                  alt="IdeaForge Global Logo"
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg object-cover pulse-glow"
                />
                <span className="text-lg sm:text-xl font-bold">IdeaForge Global</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Empowering the Next Generation of Global Innovators
              </p>
              <div className="mt-4 space-y-1 text-xs text-gray-400">
                <p>
                  <a href="mailto:ideaforgeglobal.official@gmail.com" className="hover:text-white">
                    Email: ideaforgeglobal.official@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="http://www.ideaforgeglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Website: www.ideaforgeglobal.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-2">
                <a href="/about" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  About Us
                </a>
                <a href="/about#competition" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Competition
                </a>
                <a href="/benefits" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Benefits
                </a>
                <a href="/contact" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Support</h4>
              <div className="space-y-2">
                <a href="/contact" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Help Center
                </a>
                <a href="/contact" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Contact Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Community
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition text-sm hover-scale">
                  Resources
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Connect</h4>
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/company/ideaforge-global"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition text-sm hover-scale"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/ideaforgeglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition text-sm hover-scale"
                >
                  Instagram
                </a>
                <a
                  href="mailto:ideaforgeglobal.official@gmail.com"
                  className="block text-gray-400 hover:text-white transition text-sm hover-scale"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 text-center text-gray-400 text-xs sm:text-sm">
            &copy; 2025 IdeaForge Global. All rights reserved. Built with ❤ for young innovators.
          </div>
        </div>
      </footer>

      {/* FLOATING ICONS (Expandable) */}
      <div className="fixed bottom-32 sm:bottom-32 md:bottom-36 right-4 sm:right-6 md:right-8 flex flex-col items-end gap-3 z-40">
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
          title="Menu"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </button>

        {/* Icons (visible only when expanded) */}
        {isSidebarOpen && (
          <div className="flex flex-col gap-3 animate-fade-in-up">
            <Link
              to="/arcade"
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
              title="Innovation Arcade"
            >
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </Link>
            <Link
              to="/marketplace"
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
              title="Marketplace"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </Link>
            )}
            <Link
              to="/about"
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
              title="About"
            >
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </Link>
            <Link
              to="/contact"
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-white text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center hover-lift"
              title="Contact"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </Link>
          </div>
        )}
      </div>

      {/* CHATBOT BUTTON */}
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-8 w-12 h-12 sm:w-16 sm:h-16 hero-gradient text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-40 pulse-glow hover-lift"
        title="Need Help? Chat with our AI Assistant"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-golden" />
      </button>

      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
};

export default Layout;
