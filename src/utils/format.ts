import type { Property } from '../types';

export function formatPrice(p: Property): string {
  const value = p.price.toLocaleString('en-US');
  if (p.transactionType === 'For Rent') return `$${value}/mo`;
  return `$${value}`;
}

export function formatArea(sqft: number): string {
  if (sqft >= 43560) {
    const acres = (sqft / 43560).toFixed(1);
    return `${acres} acres`;
  }
  return `${sqft.toLocaleString('en-US')} sqft`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date('2026-07-05');
  const days = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}
