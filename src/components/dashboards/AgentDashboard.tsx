import { useState } from 'react';
import type { Property, Inquiry } from '../../types';
import { formatPrice, timeAgo } from '../../utils/format';
import StatCard from './StatCard';
import PropertyFormModal from './PropertyFormModal';
import TagBadge from '../TagBadge';
import { Building, TrendingUp, ClipboardList, Plus, Pencil, Trash } from '../icons';

interface Props {
  agentId: string;
  properties: Property[];
  inquiries: Inquiry[];
  onOpen: (id: string) => void;
  onCreateProperty: (data: any) => void;
  onUpdateProperty: (id: string, data: any) => void;
  onDeleteProperty: (id: string) => void;
}

const statusStyle: Record<Property['status'], string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function AgentDashboard({
  agentId, properties, inquiries, onOpen, onCreateProperty, onUpdateProperty, onDeleteProperty,
}: Props) {
  const [modalMode, setModalMode] = useState<'closed' | 'create' | 'edit'>('closed');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const myProperties = properties.filter((p) => p.agentId === agentId);
  const myInquiries = inquiries.filter((i) => myProperties.some((p) => p.id === i.propertyId));
  const findProperty = (id: string) => properties.find((p) => p.id === id);

  const openEdit = (p: Property) => { setEditingProperty(p); setModalMode('edit'); };
  const openCreate = () => { setEditingProperty(null); setModalMode('create'); };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-900">Agent workspace</h1>
          <p className="text-navy-600/70 mt-1">Maren Okafor · Senior Listing Agent</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-md">
          <Plus className="w-4 h-4" /> Add property
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Managed listings" value={myProperties.length} icon={<Building className="w-5 h-5" />} />
        <StatCard label="Leads this month" value={myInquiries.length + 12} icon={<TrendingUp className="w-5 h-5" />} trend="+18% vs last month" />
        <StatCard label="Recent inquiries" value={myInquiries.length} icon={<ClipboardList className="w-5 h-5" />} />
      </div>

      <section>
        <h2 className="font-display text-xl text-navy-900 mb-4">Your properties</h2>
        <div className="bg-white rounded-lg border border-navy-900/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left eyebrow border-b border-navy-900/8">
                <th className="px-4 py-3 font-normal">Property</th>
                <th className="px-4 py-3 font-normal">Price</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Listed</th>
                <th className="px-4 py-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProperties.map((p) => (
                <tr key={p.id} className="border-b border-navy-900/5 last:border-0 hover:bg-parchment/60">
                  <td className="px-4 py-3">
                    <button onClick={() => onOpen(p.id)} className="flex items-center gap-3 text-left">
                      <img src={p.images[0]} alt="" className="w-12 h-10 rounded-md object-cover shrink-0" />
                      <div>
                        <p className="font-medium text-navy-900 line-clamp-1">{p.title}</p>
                        <div className="flex gap-1 mt-0.5">{p.tags.map((t) => <TagBadge key={t} tag={t} />)}</div>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 spec-plate text-navy-800">{formatPrice(p)}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[p.status]}`}>{p.status}</span></td>
                  <td className="px-4 py-3 text-navy-600/60">{timeAgo(p.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => openEdit(p)} aria-label="Edit" className="p-1.5 rounded-md hover:bg-emerald-50 text-navy-600"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteProperty(p.id)} aria-label="Delete" className="p-1.5 rounded-md hover:bg-red-50 text-navy-600"><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-navy-900 mb-4">Recent inquiries</h2>
        <div className="space-y-3">
          {myInquiries.map((i) => {
            const prop = findProperty(i.propertyId);
            return (
              <div key={i.id} className="bg-white rounded-lg border border-navy-900/8 p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-navy-900">{i.customerName}</p>
                  <span className="text-xs text-navy-600/50 font-mono">{timeAgo(i.receivedAt)}</span>
                </div>
                <p className="text-sm text-navy-700/80">{i.message}</p>
                {prop && <p className="text-xs text-emerald-600 mt-2">Re: {prop.title}</p>}
              </div>
            );
          })}
          {myInquiries.length === 0 && <p className="text-sm text-navy-600/60">No inquiries yet.</p>}
        </div>
      </section>

      {modalMode !== 'closed' && (
        <PropertyFormModal
          property={editingProperty}
          onClose={() => setModalMode('closed')}
          onSave={(data) => {
            if (modalMode === 'edit' && editingProperty) onUpdateProperty(editingProperty.id, data);
            else onCreateProperty(data);
            setModalMode('closed');
          }}
        />
      )}
    </div>
  );
}
