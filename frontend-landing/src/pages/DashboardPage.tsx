import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import Overview from '../components/dashboard/Overview';
import DashboardLoginScreen from '../components/dashboard/DashboardLoginScreen';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import ArchitectureModal from '../components/dashboard/ArchitectureModal';
import FintechView from '../components/dashboard/FintechView';
import { LayoutDashboard, Landmark, Database, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevMode } from '../context/useDevMode';
import XRayWrapper from '../components/shared/XRayWrapper';
import Footer from '../components/Footer';
import AiChat from '../components/AiChat';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get('view') || 'overview';
  
  const { isDevMode, toggleDevMode } = useDevMode();
  const [showArchitecture, setShowArchitecture] = useState(false);

  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem('demo_user_id');
    return saved ? parseInt(saved) : null;
  });

  const [isInitializing, setIsInitializing] = useState(false);

  const { data: accounts } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId!),
    enabled: !!userId && currentView === 'fintech'
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', accounts?.[0]?.id],
    queryFn: () => fintechApi.getTransactions(accounts![0].id),
    enabled: !!accounts && accounts.length > 0 && currentView === 'fintech'
  });

  const handleLogin = async () => {
    setIsInitializing(true);
    const newId = Math.floor(Math.random() * 9000) + 1000;
    try {
        await fintechApi.initDemoAccount(newId);
        localStorage.setItem('demo_user_id', newId.toString());
        setUserId(newId);
        window.location.reload(); 
    } catch {
        alert("Błąd inicjalizacji demo. Sprawdź czy kontenery działają.");
    } finally {
        setIsInitializing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_user_id');
    setUserId(null);
  };

  const setView = (view: string) => {
    setSearchParams({ view });
  };

  if (!userId) {
    return <DashboardLoginScreen onLogin={handleLogin} isInitializing={isInitializing} />;
  }

  const getHeaderContent = () => {
    switch (currentView) {
      case 'overview': return { title: 'System Overview', subtitle: 'Real-time aggregated metrics', gradient: 'from-orange-400 to-pink-500' };
      case 'fintech': return { title: 'Fintech Core', subtitle: `Logged as Guest_ID: ${userId}`, gradient: 'from-blue-400 to-cyan-400' };
      case 'b2b': return { title: 'B2B Verifier', subtitle: 'Contractor Data Verification', gradient: 'from-emerald-400 to-teal-400' };
      case 'monitor': return { title: 'Price Monitor', subtitle: 'Background Workers Status', gradient: 'from-purple-400 to-pink-400' };
      default: return { title: 'Dashboard', subtitle: 'Select module', gradient: 'from-gray-400 to-white' };
    }
  };

  const header = getHeaderContent();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fintech', label: 'Fintech Bank', icon: Landmark },
    { id: 'b2b', label: 'B2B Verifier', icon: Database },
    { id: 'monitor', label: 'Crypto Monitor', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans transition-colors duration-500 selection:bg-blue-500/30">
      <div className="mesh-background" />

      <div className="max-w-6xl mx-auto flex flex-col pt-12 px-8 pb-16">
        <DashboardHeader
          title={header.title}
          subtitle={header.subtitle}
          gradient={header.gradient}
          isDevMode={isDevMode}
          onToggleDevMode={toggleDevMode}
          onShowArchitecture={() => setShowArchitecture(true)}
          onLogout={handleLogout}
        />

        <DashboardTabs
          tabs={tabs}
          currentView={currentView}
          onViewChange={setView}
        />

        {/* Content */}
        <main className="flex-grow">
            <AnimatePresence mode="wait">
                <motion.div key={currentView} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    {currentView === 'overview' && <XRayWrapper label="Data Aggregator" tech="Redis" endpoint="GET /api/b2b/system-status" description="Agregacja danych"><Overview userId={userId} /></XRayWrapper>}
                    {currentView === 'fintech' && <FintechView accounts={accounts} transactions={transactions} />}
                    {currentView === 'b2b' && <div className="max-w-2xl mx-auto py-8"><XRayWrapper label="Data Proxy" tech="FastAPI"><CompanyVerifier /></XRayWrapper></div>}
                    {currentView === 'monitor' && <div className="max-w-3xl mx-auto"><XRayWrapper label="Live Feed" tech="Redis"><CryptoTicker /></XRayWrapper></div>}
                </motion.div>
            </AnimatePresence>
        </main>

        <ArchitectureModal isOpen={showArchitecture} onClose={() => setShowArchitecture(false)} />
      </div>
      <Footer />
      <AiChat />
    </div>
  );
}

export default DashboardPage;