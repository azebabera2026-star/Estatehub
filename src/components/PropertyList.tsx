import type { Property } from '../types';
import PropertyCard from './PropertyCard';

interface Props {
  properties: Property[];
  onOpen: (id: string) => void;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
  emptyMessage?: string;
}

export default function PropertyList({ properties, onOpen, savedIds, onToggleSave, emptyMessage }: Props) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-navy-900/15 rounded-lg">
        <p className="font-display text-xl text-navy-800">No matches yet</p>
        <p className="mt-2 text-sm text-navy-600/60">
          {emptyMessage ?? 'Try widening your price range or clearing a filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          onOpen={onOpen}
          saved={savedIds?.includes(p.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
