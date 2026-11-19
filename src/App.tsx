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
        <div className="relative min-h-screen bg-[#F4F7FB] text-[#0B1220] transition-colors duration-300 dark:bg-[#04070E] dark:text-[#F4F7FB]">
          {/* Fixed Soft Liquid-Glass Ambient Color Mesh (GPU-composited) */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="animate-float-orb absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-teal-300/30 blur-[110px] dark:bg-[#2EF2C5]/12" />
            <div className="animate-float-orb-reverse absolute top-[28%] -right-32 h-[38rem] w-[38rem] rounded-full bg-indigo-300/28 blur-[120px] dark:bg-[#7C6BFF]/14" />
            <div className="animate-float-orb absolute bottom-[10%] left-[18%] h-[32rem] w-[32rem] rounded-full bg-sky-300/25 blur-[110px] dark:bg-[#38BDF8]/10" />
          </div>

          <div className="relative z-10">
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
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
