import { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return (
          <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-bold text-gray-500">[ SECTION: ABOUT_ME ]</h2>
          </div>
        );
      case 'stack':
        return <TechStack />;
      case 'projects':
        return (
          <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-bold text-gray-500">[ SECTION: PROJECTS ]</h2>
          </div>
        );
      case 'hobby':
        return (
           <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-bold text-gray-500">[ SECTION: HOBBY ]</h2>
          </div>
        );
      case 'contact':
        return (
           <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-bold text-gray-500">[ SECTION: CONTACT ]</h2>
          </div>
        );
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

export default App;
