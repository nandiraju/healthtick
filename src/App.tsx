import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScrollShowcase } from './components/ScrollShowcase';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { AnalyticsAndPersonalization } from './components/AnalyticsAndPersonalization';
import { HistoryAndSharingSection } from './components/HistoryAndSharingSection';
import { AccountSecuritySection } from './components/AccountSecuritySection';
import { DownloadCTAAndFooter } from './components/DownloadCTAAndFooter';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#05080F] text-[#F4F7FB]">
        <Navbar />
        <main>
          <HeroSection />
          <ScrollShowcase />
          <InteractiveMapSection />
          <AnalyticsAndPersonalization />
          <HistoryAndSharingSection />
          <AccountSecuritySection />
        </main>
        <DownloadCTAAndFooter />
      </div>
    </MotionConfig>
  );
}

export default App;
