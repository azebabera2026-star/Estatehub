import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

export default function StatCard({ label, value, icon, trend }: Props) {
  return (
    <div className="bg-white rounded-lg border border-navy-900/8 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="eyebrow">{label}</span>
        <span className="text-emerald-500">{icon}</span>
      </div>
      <p className="font-display text-3xl text-navy-900 spec-plate">{value}</p>
      {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
    </div>
  );
}
