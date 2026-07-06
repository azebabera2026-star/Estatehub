import type { Property } from '../types';
import Hero from './Hero';
import PropertyList from './PropertyList';
import { Building, TrendingUp, Users } from './icons';

interface Props {
  properties: Property[];
  onOpen: (id: string) => void;
  onSearch: (keyword: string) => void;
  onSeeAll: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export default function HomePage({ properties, onOpen, onSearch, onSeeAll, savedIds, onToggleSave }: Props) {
  const featured = properties.filter((p) => p.tags.includes('Featured')).slice(0, 6);

  return (
    <div>
      <Hero onSearch={onSearch} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-1.5">Curated selection</p>
            <h2 className="font-display text-2xl sm:text-3xl text-navy-900">Featured listings</h2>
          </div>
          <button onClick={onSeeAll} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 shrink-0">
            View all listings →
          </button>
        </div>
        <PropertyList properties={featured} onOpen={onOpen} savedIds={savedIds} onToggleSave={onToggleSave} />
      </section>

      <section className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-6">
          <div className="border border-white/10 rounded-lg p-6">
            <Building className="w-6 h-6 text-emerald-400 mb-3" />
            <p className="font-display text-xl mb-1.5">List with a specialist</p>
            <p className="text-sm text-white/60">Our agents average 18 days on market — well under the county norm.</p>
          </div>
          <div className="border border-white/10 rounded-lg p-6">
            <TrendingUp className="w-6 h-6 text-emerald-400 mb-3" />
            <p className="font-display text-xl mb-1.5">Track price history</p>
            <p className="text-sm text-white/60">Every listing shows how long it's been on the market and any price drops.</p>
          </div>
          <div className="border border-white/10 rounded-lg p-6">
            <Users className="w-6 h-6 text-emerald-400 mb-3" />
            <p className="font-display text-xl mb-1.5">Built for every role</p>
            <p className="text-sm text-white/60">Buyers, agents, and admins each get a dashboard tuned to their work.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden relative h-56 group">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-navy-950/50 flex flex-col justify-end p-6">
              <p className="eyebrow text-emerald-400 mb-1">For buyers</p>
              <p className="font-display text-2xl text-white">First-time buyer? Start with houses under $900K.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden relative h-56 group">
            <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-navy-950/50 flex flex-col justify-end p-6">
              <p className="eyebrow text-emerald-400 mb-1">For landowners</p>
              <p className="font-display text-2xl text-white">Thinking of building? Browse land parcels.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
