import type { Property, SavedSearch, TourRequest } from '../../types';
import PropertyList from '../PropertyList';
import { Calendar, Heart, Search } from '../icons';

interface Props {
  savedProperties: Property[];
  savedSearches: SavedSearch[];
  tourRequests: TourRequest[];
  allProperties: Property[];
  onOpen: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const statusColor: Record<TourRequest['status'], string> = {
  Requested: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Completed: 'bg-navy-100 text-navy-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function CustomerDashboard({
  savedProperties, savedSearches, tourRequests, allProperties, onOpen, savedIds, onToggleSave,
}: Props) {
  const findProperty = (id: string) => allProperties.find((p) => p.id === id);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Welcome back, Jonah</h1>
        <p className="text-navy-600/70 mt-1">Here's what's happening with your home search.</p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-emerald-600" />
          <h2 className="font-display text-xl text-navy-900">Saved properties ({savedProperties.length})</h2>
        </div>
        <PropertyList
          properties={savedProperties}
          onOpen={onOpen}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
          emptyMessage="Tap the heart on any listing to save it here."
        />
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display text-xl text-navy-900">Saved searches</h2>
          </div>
          <div className="space-y-3">
            {savedSearches.map((s) => (
              <div key={s.id} className="bg-white rounded-lg border border-navy-900/8 p-4">
                <p className="font-medium text-navy-900">{s.label}</p>
                <p className="text-sm text-navy-600/70 font-mono mt-0.5">{s.query}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display text-xl text-navy-900">Tour requests</h2>
          </div>
          <div className="space-y-3">
            {tourRequests.map((t) => {
              const prop = findProperty(t.propertyId);
              if (!prop) return null;
              return (
                <button key={t.id} onClick={() => onOpen(prop.id)} className="w-full text-left bg-white rounded-lg border border-navy-900/8 p-4 flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors">
                  <div>
                    <p className="font-medium text-navy-900">{prop.title}</p>
                    <p className="text-sm text-navy-600/70 spec-plate">{t.date} · {t.time}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${statusColor[t.status]}`}>{t.status}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
