import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Property, PropertyType, TransactionType } from '../../types';
import { X } from '../icons';

interface Props {
  property: Property | null; // null = creating new
  onClose: () => void;
  onSave: (data: Omit<Property, 'id' | 'agentId' | 'status' | 'createdAt' | 'lat' | 'lng'>) => void;
}

const propertyTypes: PropertyType[] = ['House', 'Apartment', 'Land', 'Villa', 'Townhouse'];
const transactionTypes: TransactionType[] = ['For Sale', 'For Rent'];

export default function PropertyFormModal({ property, onClose, onSave }: Props) {
  const [title, setTitle] = useState(property?.title ?? '');
  const [city, setCity] = useState(property?.city ?? '');
  const [address, setAddress] = useState(property?.address ?? '');
  const [description, setDescription] = useState(property?.description ?? '');
  const [price, setPrice] = useState(property?.price ?? 500000);
  const [propertyType, setPropertyType] = useState<PropertyType>(property?.propertyType ?? 'House');
  const [transactionType, setTransactionType] = useState<TransactionType>(property?.transactionType ?? 'For Sale');
  const [bedrooms, setBedrooms] = useState(property?.bedrooms ?? 3);
  const [bathrooms, setBathrooms] = useState(property?.bathrooms ?? 2);
  const [areaSqft, setAreaSqft] = useState(property?.areaSqft ?? 1500);
  const [imageUrl, setImageUrl] = useState(property?.images[0] ?? '');
  const [amenitiesText, setAmenitiesText] = useState(property?.amenities.join(', ') ?? '');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      title, city, address, description, price, propertyType, transactionType,
      bedrooms, bathrooms, areaSqft,
      images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80'],
      tags: property?.tags ?? ['New'],
      amenities: amenitiesText.split(',').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-navy-900/8">
          <h2 className="font-display text-xl text-navy-900">{property ? 'Edit property' : 'Add a new property'}</h2>
          <button onClick={onClose} aria-label="Close"><X className="w-5 h-5 text-navy-600" /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="eyebrow block mb-1.5">Title</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-1.5">City</label>
              <input required value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Address</label>
              <input required value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-1.5">Description</label>
            <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm resize-none" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-1.5">Property type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm bg-white">
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Transaction</label>
              <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm bg-white">
                {transactionTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="eyebrow block mb-1.5">Price ($)</label>
              <input required type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm spec-plate" />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Bedrooms</label>
              <input type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm spec-plate" />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Bathrooms</label>
              <input type="number" min={0} value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm spec-plate" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-1.5">Area (sqft)</label>
              <input type="number" min={0} value={areaSqft} onChange={(e) => setAreaSqft(Number(e.target.value))}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm spec-plate" />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Cover image URL</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…"
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-1.5">Amenities (comma separated)</label>
            <input value={amenitiesText} onChange={(e) => setAmenitiesText(e.target.value)}
              placeholder="Central AC, Fenced Yard, EV Charging"
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-900/5 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-md">
              {property ? 'Save changes' : 'Submit for approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
