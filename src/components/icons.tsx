import type { SVGProps, ReactNode } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (children: ReactNode, props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
);

export const Bed = (p: IconProps) => base(<>
  <path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
  <path d="M2 18v2" /><path d="M22 18v2" />
  <path d="M4 10V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
  <path d="M13 10V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4" />
</>, p);

export const Bath = (p: IconProps) => base(<>
  <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.5 1V12" />
  <path d="M4 12h18v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" />
  <path d="M8 20v2" /><path d="M16 20v2" />
</>, p);

export const Ruler = (p: IconProps) => base(<>
  <rect x="2" y="8" width="20" height="8" rx="1" />
  <path d="M7 8v3" /><path d="M12 8v3" /><path d="M17 8v3" />
</>, p);

export const MapPin = (p: IconProps) => base(<>
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
  <circle cx="12" cy="10" r="3" />
</>, p);

export const Heart = (p: IconProps) => base(<>
  <path d="M19 14c1.2-1.4 2-2.9 2-4.7A4.8 4.8 0 0 0 16.2 4.5c-1.7 0-3.2.8-4.2 2.1a5.2 5.2 0 0 0-4.2-2.1A4.8 4.8 0 0 0 3 9.3c0 1.8.8 3.3 2 4.7l7 7.5 7-7.5Z" />
</>, p);

export const Search = (p: IconProps) => base(<>
  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
</>, p);

export const SlidersHorizontal = (p: IconProps) => base(<>
  <path d="M4 6h9" /><path d="M17 6h3" /><path d="M4 12h5" /><path d="M13 12h7" /><path d="M4 18h11" /><path d="M19 18h1" />
  <circle cx="15" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="17" cy="18" r="2" />
</>, p);

export const ChevronDown = (p: IconProps) => base(<path d="m6 9 6 6 6-6" />, p);
export const ChevronLeft = (p: IconProps) => base(<path d="m15 18-6-6 6-6" />, p);
export const ChevronRight = (p: IconProps) => base(<path d="m9 18 6-6-6-6" />, p);
export const X = (p: IconProps) => base(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>, p);
export const Menu = (p: IconProps) => base(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>, p);
export const Check = (p: IconProps) => base(<path d="m5 13 4 4L19 7" />, p);
export const Plus = (p: IconProps) => base(<><path d="M12 5v14" /><path d="M5 12h14" /></>, p);
export const Pencil = (p: IconProps) => base(<><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></>, p);
export const Trash = (p: IconProps) => base(<><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></>, p);
export const Users = (p: IconProps) => base(<><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="9" r="2.6" /><path d="M15 20a5.2 5.2 0 0 1 6.5-5" /></>, p);
export const Building = (p: IconProps) => base(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1" /><path d="M14 8h1" /><path d="M9 12h1" /><path d="M14 12h1" /><path d="M9 16h1" /><path d="M14 16h1" /></>, p);
export const ClipboardList = (p: IconProps) => base(<><rect x="5" y="4" width="14" height="17" rx="1.5" /><path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z" /><path d="M9 11h6" /><path d="M9 15h6" /><path d="M9 19h4" /></>, p);
export const TrendingUp = (p: IconProps) => base(<><path d="m3 17 6-6 4 4 7-8" /><path d="M14 6h6v6" /></>, p);
export const Calendar = (p: IconProps) => base(<><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 10h18" /><path d="M8 3v4" /><path d="M16 3v4" /></>, p);
export const Phone = (p: IconProps) => base(<path d="M4 5c0 8.3 6.7 15 15 15l2-4-6-2-2 2c-2.5-1.2-4.8-3.5-6-6l2-2-2-6Z" />, p);
export const Mail = (p: IconProps) => base(<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3.5 6 8.5 7 8.5-7" /></>, p);
export const ArrowLeft = (p: IconProps) => base(<><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>, p);
export const LayoutDashboard = (p: IconProps) => base(<><rect x="3" y="3" width="8" height="9" rx="1" /><rect x="13" y="3" width="8" height="5" rx="1" /><rect x="13" y="12" width="8" height="9" rx="1" /><rect x="3" y="16" width="8" height="5" rx="1" /></>, p);
