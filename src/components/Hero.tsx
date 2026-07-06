import { useState } from 'react';
import { Search } from './icons';

interface Props {
  onSearch: (keyword: string) => void;
}

export default function Hero({ onSearch }: Props) {
  const [value, setValue] = useState('');

  return (
    <section className="relative blueprint-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/10 via-navy-950/60 to-navy-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28">
        <p className="eyebrow text-emerald-400 mb-4">Lot 001 — Deed of Discovery</p>
        <h1 className="font-display text-4xl sm:text-6xl text-white leading-[1.05] max-w-2xl">
          Every listing, drawn to scale.
        </h1>
        <p className="mt-5 max-w-lg text-white/60 text-base sm:text-lg">
          Browse houses, apartments, and land parcels with the same precision as a
          building survey — real prices, real square footage, no surprises.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); onSearch(value); }}
          className="mt-10 max-w-xl bg-white rounded-lg p-2 flex items-center gap-2 shadow-2xl shadow-black/40"
        >
          <Search className="w-5 h-5 text-navy-600/40 ml-2" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Try “Palo Alto house” or “apartment for rent”"
            className="flex-1 py-2.5 px-1 outline-none text-navy-900 text-sm"
          />
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors">
            Search
          </button>
        </form>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 spec-plate text-white/70 text-sm">
          <span><span className="text-emerald-400">104</span> active listings</span>
          <span><span className="text-emerald-400">14</span> agents online</span>
          <span><span className="text-emerald-400">3</span> counties covered</span>
        </div>
      </div>
    </section>
  );
}
