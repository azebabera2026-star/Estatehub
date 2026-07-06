import type { Property } from '../types';
import { formatPrice, formatArea, timeAgo } from '../utils/format';
import TagBadge from './TagBadge';
import { Bed, Bath, Ruler, MapPin, Heart } from './icons';

interface Props {
  property: Property;
  onOpen: (id: string) => void;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
}

export default function PropertyCard({ property, onOpen, saved, onToggleSave }: Props) {
  return (
    <article className="group bg-white rounded-lg overflow-hidden border border-navy-900/5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_28px_-8px_rgba(16,24,40,0.18)] transition-shadow duration-300">
      <button onClick={() => onOpen(property.id)} className="block w-full text-left">
        <div className="relative h-52 overflow-hidden bg-navy-100">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            {property.tags.map((t) => <TagBadge key={t} tag={t} />)}
          </div>
          <div className="absolute bottom-3 left-3 spec-plate bg-navy-950/85 text-white text-sm px-2.5 py-1 rounded-sm">
            {formatPrice(property)}
          </div>
        </div>
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <button onClick={() => onOpen(property.id)} className="text-left">
            <h3 className="font-display text-lg font-medium text-navy-900 leading-snug group-hover:text-emerald-600 transition-colors">
              {property.title}
            </h3>
          </button>
          {onToggleSave && (
            <button
              aria-label={saved ? 'Remove from saved properties' : 'Save property'}
              onClick={() => onToggleSave(property.id)}
              className="shrink-0 p-1.5 rounded-full hover:bg-emerald-50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-emerald-500 text-emerald-500' : 'text-navy-600/40'}`} />
            </button>
          )}
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-navy-700/70">
          <MapPin className="w-3.5 h-3.5" /> {property.city}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-navy-700/80 spec-plate">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{property.bedrooms}</span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{property.bathrooms}</span>
          )}
          <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{formatArea(property.areaSqft)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-navy-600/50">
          <span className="uppercase tracking-wide font-mono">{property.propertyType} · {property.transactionType}</span>
          <span>{timeAgo(property.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}
