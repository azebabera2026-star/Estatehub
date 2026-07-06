import { useState } from 'react';
import type { Property, AppUser } from '../../types';
import { formatPrice, timeAgo } from '../../utils/format';
import StatCard from './StatCard';
import { Building, Users, TrendingUp, LayoutDashboard, Check, X as XIcon } from '../icons';

interface Props {
  properties: Property[];
  users: AppUser[];
  stats: { totalUsers: number; totalProperties: number; totalAgents: number; monthlyLeads: number };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onOpen: (id: string) => void;
  onToggleUserStatus: (id: string) => void;
}

export default function AdminDashboard({ properties, users, stats, onApprove, onReject, onOpen, onToggleUserStatus }: Props) {
  const [tab, setTab] = useState<'overview' | 'users'>('overview');
  const pending = properties.filter((p) => p.status === 'Pending');

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Platform overview</h1>
        <p className="text-navy-600/70 mt-1">Renata Silva · Admin</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-5">
        <StatCard label="Total users" value={stats.totalUsers} icon={<Users className="w-5 h-5" />} />
        <StatCard label="Total properties" value={stats.totalProperties} icon={<Building className="w-5 h-5" />} />
        <StatCard label="Active agents" value={stats.totalAgents} icon={<LayoutDashboard className="w-5 h-5" />} />
        <StatCard label="Monthly leads" value={stats.monthlyLeads} icon={<TrendingUp className="w-5 h-5" />} trend="+9% vs last month" />
      </div>

      <div className="flex gap-1 border-b border-navy-900/8">
        {(['overview', 'users'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t ? 'border-emerald-500 text-navy-900' : 'border-transparent text-navy-600/60 hover:text-navy-900'
            }`}
          >
            {t === 'overview' ? 'Pending approvals' : 'User management'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <section>
          <div className="bg-white rounded-lg border border-navy-900/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left eyebrow border-b border-navy-900/8">
                  <th className="px-4 py-3 font-normal">Property</th>
                  <th className="px-4 py-3 font-normal">Price</th>
                  <th className="px-4 py-3 font-normal">Submitted</th>
                  <th className="px-4 py-3 font-normal text-right">Decision</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id} className="border-b border-navy-900/5 last:border-0 hover:bg-parchment/60">
                    <td className="px-4 py-3">
                      <button onClick={() => onOpen(p.id)} className="flex items-center gap-3 text-left">
                        <img src={p.images[0]} alt="" className="w-12 h-10 rounded-md object-cover" />
                        <div>
                          <p className="font-medium text-navy-900 line-clamp-1">{p.title}</p>
                          <p className="text-xs text-navy-600/60">{p.city} · {p.propertyType}</p>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 spec-plate text-navy-800">{formatPrice(p)}</td>
                    <td className="px-4 py-3 text-navy-600/60">{timeAgo(p.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onApprove(p.id)} className="flex items-center gap-1 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md">
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button onClick={() => onReject(p.id)} className="flex items-center gap-1 text-xs font-medium border border-navy-900/15 hover:bg-red-50 hover:text-red-700 hover:border-red-200 px-3 py-1.5 rounded-md">
                          <XIcon className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pending.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-navy-600/60">No listings awaiting review.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'users' && (
        <section>
          <div className="bg-white rounded-lg border border-navy-900/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left eyebrow border-b border-navy-900/8">
                  <th className="px-4 py-3 font-normal">User</th>
                  <th className="px-4 py-3 font-normal">Role</th>
                  <th className="px-4 py-3 font-normal">Joined</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-navy-900/5 last:border-0 hover:bg-parchment/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-navy-900">{u.name}</p>
                          <p className="text-xs text-navy-600/60">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-navy-700">{u.role}</td>
                    <td className="px-4 py-3 text-navy-600/60">{u.joined}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => onToggleUserStatus(u.id)} className="text-xs font-medium text-navy-700 hover:text-emerald-600 border border-navy-900/15 px-3 py-1.5 rounded-md">
                        {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
