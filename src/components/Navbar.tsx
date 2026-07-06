import { useState } from 'react';
import type { Role, View } from '../types';
import { LayoutDashboard, Menu, X, ChevronDown } from './icons';

interface Props {
  view: View;
  onNavigate: (v: View) => void;
  role: Role;
  onRoleChange: (r: Role) => void;
}

const roleLabels: Record<Role, string> = {
  guest: 'Browsing as Guest',
  customer: 'Jonah Whitfield · Customer',
  agent: 'Maren Okafor · Agent',
  admin: 'Renata Silva · Admin',
};

export default function Navbar({ view, onNavigate, role, onRoleChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLink = (label: string, target: View, matchName: View['name']) => (
    <button
      onClick={() => { onNavigate(target); setMobileOpen(false); }}
      className={`text-sm font-medium transition-colors ${
        view.name === matchName ? 'text-emerald-600' : 'text-white/75 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-navy-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate({ name: 'home' })} className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-sm bg-emerald-500 flex items-center justify-center font-display font-semibold text-navy-950">E</span>
          <span className="font-display text-lg text-white tracking-tight">EstateHub</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {navLink('Home', { name: 'home' }, 'home')}
          {navLink('Listings', { name: 'listings' }, 'listings')}
          {role !== 'guest' && navLink('Dashboard', { name: 'dashboard' }, 'dashboard')}
        </nav>

        <div className="hidden md:flex items-center gap-3 relative">
          <button
            onClick={() => setRoleMenuOpen((o) => !o)}
            className="flex items-center gap-2 text-xs font-mono text-white/80 border border-white/15 rounded-full pl-3 pr-2 py-1.5 hover:border-white/35 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            {roleLabels[role]}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {roleMenuOpen && (
            <div className="absolute right-0 top-11 w-64 bg-white rounded-lg shadow-xl border border-navy-900/10 overflow-hidden">
              <p className="px-4 pt-3 pb-2 eyebrow">Simulate role</p>
              {(['guest', 'customer', 'agent', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { onRoleChange(r); setRoleMenuOpen(false); onNavigate(r === 'guest' ? { name: 'home' } : { name: 'dashboard' }); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors ${role === r ? 'text-emerald-600 font-medium' : 'text-navy-800'}`}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-navy-950 border-t border-white/5">
          {navLink('Home', { name: 'home' }, 'home')}
          {navLink('Listings', { name: 'listings' }, 'listings')}
          {role !== 'guest' && navLink('Dashboard', { name: 'dashboard' }, 'dashboard')}
          <div className="pt-3 border-t border-white/10">
            <p className="eyebrow text-white/50 mb-2">Simulate role</p>
            <div className="flex flex-col gap-2">
              {(['guest', 'customer', 'agent', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { onRoleChange(r); setMobileOpen(false); onNavigate(r === 'guest' ? { name: 'home' } : { name: 'dashboard' }); }}
                  className={`text-left text-sm py-1 ${role === r ? 'text-emerald-500' : 'text-white/70'}`}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
