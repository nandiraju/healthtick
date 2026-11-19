import type { ReactNode } from 'react';
import { Wifi } from 'lucide-react';

interface IPhoneFrameProps {
  children: ReactNode;
  badgeText?: string;
}

/**
 * True-to-life iPhone 16 Pro / 17 Pro hardware frame (exact 19.5:9 aspect ratio)
 * with translucent Liquid Glass screen depth & subtle specular display reflection.
 */
export function IPhoneFrame({ children, badgeText }: IPhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[292px] sm:w-[308px]">
      {/* Left Hardware Buttons (Action + Volume Up/Down) */}
      <span
        aria-hidden="true"
        className="absolute top-[104px] -left-[3px] h-7 w-[3px] rounded-l-sm bg-slate-300 dark:bg-slate-600"
      />
      <span
        aria-hidden="true"
        className="absolute top-[148px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-slate-300 dark:bg-slate-600"
      />
      <span
        aria-hidden="true"
        className="absolute top-[204px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-slate-300 dark:bg-slate-600"
      />
      {/* Right Hardware Power Button */}
      <span
        aria-hidden="true"
        className="absolute top-[168px] -right-[3px] h-16 w-[3px] rounded-r-sm bg-slate-300 dark:bg-slate-600"
      />

      {/* Outer Titanium Chassis — exact 9:19.5 iPhone aspect ratio */}
      <div className="relative aspect-[9/19.5] w-full rounded-[48px] bg-gradient-to-b from-[#E5E9F0] via-[#C6CDD8] to-[#A6B0BF] p-[3px] shadow-[0_38px_85px_-20px_rgba(15,23,42,0.26),0_14px_32px_-12px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:from-[#434B5D] dark:via-[#222836] dark:to-[#11151F] dark:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.88)]">
        {/* Inner Display Bezel */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[45px] bg-[#0B0E14] p-[9px]">
          {/* Translucent Liquid Glass Screen */}
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-gradient-to-b from-white/92 via-[#F3F7FD]/88 to-[#ECF4FA]/90 text-[#0B1220] backdrop-blur-2xl dark:from-[#0C1426]/92 dark:via-[#080F1E]/90 dark:to-[#070B16]/94 dark:text-[#F4F7FB]">
            {/* Internal Living Soft Mesh Behind App Cards */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-teal-400/20 blur-2xl dark:bg-[#2EF2C5]/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-indigo-400/20 blur-2xl dark:bg-[#7C6BFF]/18"
            />

            {/* Diagonal Specular Glass Reflection Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60 dark:from-white/[0.08]"
            />

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
            <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-1 pb-4">
              {children}
            </div>

            {/* iOS Home Indicator */}
            <div className="relative z-20 flex shrink-0 justify-center pt-1 pb-2">
              <div className="h-[4px] w-[110px] rounded-full bg-slate-900/20 dark:bg-white/25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
