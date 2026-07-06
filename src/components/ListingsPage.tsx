import { useMemo, useState } from 'react';
import type { Filters, Property } from '../types';
import SearchFilters, { defaultFilters } from './SearchFilters';
import PropertyList from './PropertyList';
import { SlidersHorizontal, X } from './icons';

interface Props {
  allProperties: Property[];
  initialFilters?: Filters;
  onOpen: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export default function ListingsPage({ allProperties, initialFilters, onOpen, savedIds, onToggleSave }: Props) {
  const [filters, setFilters] = useState<Filters>(initialFilters ?? defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const cities = useMemo(() => Array.from(new Set(allProperties.map((p) => p.city))).sort(), [allProperties]);

  const filtered = useMemo(() => {
    let result = allProperties.filter((p) => p.status === 'Approved').filter((p) => {
      const kw = filters.keyword.trim().toLowerCase();
      if (kw && !`${p.title} ${p.city} ${p.address}`.toLowerCase().includes(kw)) return false;
      if (filters.city !== 'Any' && p.city !== filters.city) return false;
      if (filters.propertyType !== 'Any' && p.propertyType !== filters.propertyType) return false;
      if (filters.transactionType !== 'Any' && p.transactionType !== filters.transactionType) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms > 0 && p.bathrooms < filters.bathrooms) return false;
      return true;
    });
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'newest') result = [...result].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return result;
  }, [allProperties, filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="eyebrow mb-1.5">All listings</p>
        <h1 className="font-display text-3xl text-navy-900">Browse the full catalog</h1>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SearchFilters filters={filters} onChange={setFilters} cities={cities} resultCount={filtered.length} />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium border border-navy-900/15 rounded-md px-3 py-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <span className="hidden lg:inline text-sm text-navy-600/60 font-mono">{filtered.length} properties</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)}
              className="text-sm border border-navy-900/15 rounded-md px-3 py-2 bg-white">
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          <PropertyList properties={filtered} onOpen={onOpen} savedIds={savedIds} onToggleSave={onToggleSave} />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-parchment overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-lg">Filters</p>
              <button onClick={() => setMobileFiltersOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <SearchFilters filters={filters} onChange={setFilters} cities={cities} resultCount={filtered.length} compact />
          </div>
        </div>
      )}
    </div>
  );
}
