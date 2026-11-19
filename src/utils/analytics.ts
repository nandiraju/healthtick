declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && window.GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, params);
  }
}
