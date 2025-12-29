import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import TechStack from '../components/TechStack';
import AiMentoring from '../components/AiMentoring';
import Projects from '../components/Projects';
import About from '../components/About';
import Hobby from '../components/Hobby';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AiChat from '../components/AiChat';

const LandingPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
     return location.hash === '#projects' ? 'projects' : 'home';
  });

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return <About />;
      case 'stack':
        return <TechStack />;
      case 'ai-mentoring':
        return <AiMentoring />;
      case 'projects':
        return <Projects />;
      case 'hobby':
        return <Hobby />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-white font-sans overflow-hidden selection:bg-blue-500/30">
      <div className="mesh-background" />
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="flex-grow flex flex-col justify-center px-4 md:px-16 lg:px-24 pt-20">
        {renderSection()}
      </main>
      <Footer />
      <AiChat />
    </div>
  );
}

export default LandingPage;