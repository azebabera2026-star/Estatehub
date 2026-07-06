import type { Filters, PropertyType, TransactionType } from '../types';
import { Search, X } from './icons';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  cities: string[];
  resultCount: number;
  compact?: boolean;
}

const propertyTypes: (PropertyType | 'Any')[] = ['Any', 'House', 'Apartment', 'Land', 'Villa', 'Townhouse'];
const transactionTypes: (TransactionType | 'Any')[] = ['Any', 'For Sale', 'For Rent'];

export const defaultFilters: Filters = {
  keyword: '', city: 'Any', propertyType: 'Any', transactionType: 'Any',
  minPrice: 0, maxPrice: 5000000, bedrooms: 0, bathrooms: 0,
};

export default function SearchFilters({ filters, onChange, cities, resultCount, compact }: Props) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value });
  const isDefault = JSON.stringify(filters) === JSON.stringify(defaultFilters);

  return (
    <div className={compact ? '' : 'bg-white rounded-lg border border-navy-900/8 p-5'}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-navy-900">Refine your search</h2>
        {!isDefault && (
          <button onClick={() => onChange(defaultFilters)} className="text-xs font-mono text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-600/40" />
        <input
          value={filters.keyword}
          onChange={(e) => set('keyword', e.target.value)}
          placeholder="Search by title, neighborhood…"
          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-navy-900/10 bg-parchment/60 text-sm focus:bg-white outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="eyebrow block mb-1.5">City</label>
          <select value={filters.city} onChange={(e) => set('city', e.target.value)}
            className="w-full rounded-md border border-navy-900/10 py-2 px-2.5 text-sm bg-white">
            <option value="Any">Any city</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-1.5">Transaction</label>
          <select value={filters.transactionType} onChange={(e) => set('transactionType', e.target.value as any)}
            className="w-full rounded-md border border-navy-900/10 py-2 px-2.5 text-sm bg-white">
            {transactionTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="eyebrow block mb-1.5">Property type</label>
        <div className="flex flex-wrap gap-1.5">
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => set('propertyType', t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                filters.propertyType === t
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-navy-900/15 text-navy-700 hover:border-navy-900/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="eyebrow block mb-1.5">Price range</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy-600/50 text-sm spec-plate">$</span>
            <input type="number" min={0} value={filters.minPrice}
              onChange={(e) => set('minPrice', Number(e.target.value))}
              className="w-full pl-6 pr-2 py-2 rounded-md border border-navy-900/10 text-sm spec-plate" />
          </div>
          <span className="text-navy-600/40 text-sm">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy-600/50 text-sm spec-plate">$</span>
            <input type="number" min={0} value={filters.maxPrice}
              onChange={(e) => set('maxPrice', Number(e.target.value))}
              className="w-full pl-6 pr-2 py-2 rounded-md border border-navy-900/10 text-sm spec-plate" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="eyebrow block mb-1.5">Min bedrooms</label>
          <select value={filters.bedrooms} onChange={(e) => set('bedrooms', Number(e.target.value))}
            className="w-full rounded-md border border-navy-900/10 py-2 px-2.5 text-sm bg-white">
            {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-1.5">Min bathrooms</label>
          <select value={filters.bathrooms} onChange={(e) => set('bathrooms', Number(e.target.value))}
            className="w-full rounded-md border border-navy-900/10 py-2 px-2.5 text-sm bg-white">
            {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</option>)}
          </select>
        </div>
      </div>

      <div className="pt-3 border-t border-navy-900/8 flex items-center justify-between">
        <span className="text-xs text-navy-600/60 font-mono">{resultCount} match{resultCount === 1 ? '' : 'es'}</span>
      </div>
    </div>
  );
}
