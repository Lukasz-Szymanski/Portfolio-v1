import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import About from '../components/About';
import Hobby from '../components/Hobby';
import Contact from '../components/Contact';

function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#projects') {
      setActiveSection('projects');
    }
    
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
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="pt-20 px-4 md:px-16 lg:px-24">
        {renderSection()}
      </main>
    </div>
  );
}

export default LandingPage;
