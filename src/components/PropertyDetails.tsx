import { useState } from 'react';
import type { Property, Agent } from '../types';
import { formatPrice, formatArea, timeAgo } from '../utils/format';
import TagBadge from './TagBadge';
import { ArrowLeft, Bed, Bath, Ruler, MapPin, Check, Phone, Mail, Heart } from './icons';

interface Props {
  property: Property;
  agent: Agent;
  onBack: () => void;
  saved: boolean;
  onToggleSave: (id: string) => void;
}

export default function PropertyDetails({ property, agent, onBack, saved, onToggleSave }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState(`Hi ${agent.name.split(' ')[0]}, I'm interested in ${property.title}. Could we schedule a tour?`);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-navy-700 hover:text-emerald-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </button>

      {/* Gallery */}
      <div className="mb-8">
        <div className="relative rounded-lg overflow-hidden h-[340px] sm:h-[460px] bg-navy-100">
          <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex gap-2">
            {property.tags.map((t) => <TagBadge key={t} tag={t} />)}
          </div>
          <button
            onClick={() => onToggleSave(property.id)}
            aria-label={saved ? 'Remove from saved' : 'Save property'}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-emerald-500 text-emerald-500' : 'text-navy-700'}`} />
          </button>
        </div>
        {property.images.length > 1 && (
          <div className="flex gap-2 mt-2">
            {property.images.map((img, i) => (
              <button key={img} onClick={() => setActiveImage(i)}
                className={`h-16 w-24 rounded-md overflow-hidden border-2 ${activeImage === i ? 'border-emerald-500' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2">
          <p className="eyebrow mb-2">{property.propertyType} · {property.transactionType}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-navy-900">{property.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-navy-700/70">
            <MapPin className="w-4 h-4" /> {property.address}
          </p>

          <div className="mt-6 flex items-center gap-6 py-5 border-y border-navy-900/8 spec-plate text-navy-800">
            {property.bedrooms > 0 && <span className="flex items-center gap-2"><Bed className="w-5 h-5 text-emerald-600" />{property.bedrooms} Beds</span>}
            {property.bathrooms > 0 && <span className="flex items-center gap-2"><Bath className="w-5 h-5 text-emerald-600" />{property.bathrooms} Baths</span>}
            <span className="flex items-center gap-2"><Ruler className="w-5 h-5 text-emerald-600" />{formatArea(property.areaSqft)}</span>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-navy-900 mb-3">About this property</h2>
            <p className="text-navy-700/85 leading-relaxed">{property.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-navy-900 mb-3">Amenities</h2>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm text-navy-800">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-navy-900 mb-3">Location</h2>
            <div className="relative h-64 rounded-lg overflow-hidden blueprint-bg flex items-center justify-center border border-navy-900/10">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-white font-mono text-sm">{property.lat.toFixed(4)}° N, {Math.abs(property.lng).toFixed(4)}° W</p>
                <p className="text-white/50 text-xs mt-1">Mock map preview — {property.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-lg border border-navy-900/8 p-5">
            <p className="eyebrow mb-1">Listed at</p>
            <p className="font-display text-3xl text-navy-900 spec-plate">{formatPrice(property)}</p>
            <p className="text-xs text-navy-600/50 mt-1">Listed {timeAgo(property.createdAt)}</p>
          </div>

          <div className="bg-white rounded-lg border border-navy-900/8 p-5">
            <p className="eyebrow mb-3">Listing agent</p>
            <div className="flex items-center gap-3">
              <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-medium text-navy-900">{agent.name}</p>
                <p className="text-xs text-navy-600/60">{agent.title}</p>
              </div>
            </div>
            <p className="text-sm text-navy-700/80 mt-3 leading-relaxed">{agent.bio}</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-navy-800 hover:text-emerald-600"><Phone className="w-4 h-4" /> {agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-navy-800 hover:text-emerald-600"><Mail className="w-4 h-4" /> {agent.email}</a>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-navy-900/8 p-5">
            <p className="eyebrow mb-3">Request a tour</p>
            {formSent ? (
              <div className="text-sm text-emerald-700 bg-emerald-50 rounded-md p-3 flex items-center gap-2">
                <Check className="w-4 h-4" /> Message sent to {agent.name.split(' ')[0]}. They'll follow up shortly.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-2.5">
                <input required placeholder="Your name" className="w-full rounded-md border border-navy-900/10 px-3 py-2 text-sm" />
                <input required type="email" placeholder="Your email" className="w-full rounded-md border border-navy-900/10 px-3 py-2 text-sm" />
                <textarea required rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-navy-900/10 px-3 py-2 text-sm resize-none" />
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-md transition-colors">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
