import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
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
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#F8FAFC] text-[#0B1220] transition-colors duration-300 dark:bg-[#05080F] dark:text-[#F4F7FB]">
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
    </ThemeProvider>
  );
}

export default App;
