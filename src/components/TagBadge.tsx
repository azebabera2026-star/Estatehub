import type { ListingTag } from '../types';

const styles: Record<ListingTag, string> = {
  Featured: 'bg-emerald-500 text-white',
  New: 'bg-navy-800 text-white',
  'Price Drop': 'bg-clay text-white',
  Sold: 'bg-navy-950/80 text-white',
  Pending: 'bg-amber-500 text-white',
};

export default function TagBadge({ tag }: { tag: ListingTag }) {
  return (
    <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm ${styles[tag]}`}>
      {tag}
    </span>
  );
}
