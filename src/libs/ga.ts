/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (config: string, gtag: string | undefined, opts: any) => void;
  }
}

// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  });
};

// log specific events happening.
export const event = ({
  action,
  params
}: {
  action: string;
  params: string;
}) => {
  window.gtag('event', action, params);
};
