import type { ReactNode } from 'react';
import { Wifi } from 'lucide-react';

interface IPhoneFrameProps {
  children: ReactNode;
  badgeText?: string;
}

/**
 * True-to-life iPhone 16 Pro / 17 Pro hardware frame (19.5:9 aspect ratio: 300px x 650px).
 * Adapts smoothly between Natural Titanium (Light) and Black Titanium (Dark).
 */
export function IPhoneFrame({ children, badgeText }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[292px] sm:w-[308px]">
      {/* Left Hardware Buttons (Action + Volume Up/Down) */}
      <span
        aria-hidden="true"
        className="absolute top-[104px] -left-[3px] h-7 w-[3px] rounded-l-sm bg-slate-400/90 dark:bg-slate-600"
      />
      <span
        aria-hidden="true"
        className="absolute top-[148px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-slate-400/90 dark:bg-slate-600"
      />
      <span
        aria-hidden="true"
        className="absolute top-[204px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-slate-400/90 dark:bg-slate-600"
      />
      {/* Right Hardware Power Button */}
      <span
        aria-hidden="true"
        className="absolute top-[168px] -right-[3px] h-16 w-[3px] rounded-r-sm bg-slate-400/90 dark:bg-slate-600"
      />

      {/* Outer Titanium Chassis — exact 9:19.5 iPhone aspect ratio */}
      <div className="relative aspect-[9/19.5] w-full rounded-[48px] bg-gradient-to-b from-[#D4D8DF] via-[#B4BBC6] to-[#98A1AE] p-[3px] shadow-[0_32px_70px_-18px_rgba(15,23,42,0.28),0_12px_28px_-10px_rgba(15,23,42,0.16)] dark:from-[#3A4150] dark:via-[#1D222D] dark:to-[#11151E] dark:shadow-[0_36px_90px_-15px_rgba(0,0,0,0.85)]">
        {/* Inner Black Display Bezel */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[45px] bg-[#090B10] p-[9px]">
          {/* Active OLED Screen */}
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-[#F8FAFC] text-[#0B1220] dark:bg-[#090F1D] dark:text-[#F4F7FB]">
            {/* iOS Status Bar + Dynamic Island */}
            <div className="relative z-20 flex shrink-0 items-center justify-between px-6 pt-3 pb-2">
              <span className="text-[11px] font-semibold tracking-tight text-slate-900 dark:text-white">
                9:41
              </span>

              {/* Dynamic Island */}
              <div className="flex h-[22px] w-[86px] items-center justify-between rounded-full bg-black px-2.5 shadow-inner">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                {badgeText ? (
                  <span className="font-mono-tech text-[8px] font-semibold tracking-wider text-slate-300">
                    {badgeText}
                  </span>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#141A29] ring-1 ring-slate-700/70" />
                )}
              </div>

              {/* Signal + WiFi + Battery */}
              <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                <div className="flex items-end gap-[1.5px]">
                  <span className="h-1.5 w-[2px] rounded-full bg-current" />
                  <span className="h-2 w-[2px] rounded-full bg-current" />
                  <span className="h-2.5 w-[2px] rounded-full bg-current" />
                  <span className="h-3 w-[2px] rounded-full bg-current opacity-40" />
                </div>
                <Wifi className="h-3 w-3 stroke-[2.3]" />
                <div className="flex h-[10px] w-[19px] items-center rounded-[3px] border border-current/60 p-[1.5px]">
                  <div className="h-full w-[82%] rounded-[1.5px] bg-current" />
                </div>
              </div>
            </div>

            {/* App Content Viewport */}
            <div className="relative flex-1 overflow-y-auto px-4 pt-1 pb-4">
              {children}
            </div>

            {/* iOS Home Indicator */}
            <div className="flex shrink-0 justify-center pt-1 pb-2">
              <div className="h-[4px] w-[110px] rounded-full bg-slate-900/20 dark:bg-white/25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
