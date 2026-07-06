import { useMemo, useState } from 'react';
import type { Filters, Property, Role, View } from './types';
import {
  properties as initialProperties, agents, users, savedSearches, tourRequests,
  inquiries, savedPropertyIds, platformStats,
} from './data/mockData';
import { defaultFilters } from './components/SearchFilters';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ListingsPage from './components/ListingsPage';
import PropertyDetails from './components/PropertyDetails';
import Dashboards from './components/Dashboards';

let nextId = 100;

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' });
  const [role, setRole] = useState<Role>('guest');
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [savedIds, setSavedIds] = useState<string[]>(savedPropertyIds);
  const [listingFilters, setListingFilters] = useState<Filters>(defaultFilters);
  const [userList, setUserList] = useState(users);

  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const goToListingsWithSearch = (keyword: string) => {
    setListingFilters({ ...defaultFilters, keyword });
    setView({ name: 'listings' });
  };

  const activeProperty = useMemo(
    () => (view.name === 'details' ? properties.find((p) => p.id === view.propertyId) : undefined),
    [view, properties]
  );
  const activeAgent = activeProperty ? agents.find((a) => a.id === activeProperty.agentId) : undefined;

  const createProperty = (data: any) => {
    const id = `p${nextId++}`;
    setProperties((prev) => [
      { ...data, id, agentId: 'a1', status: 'Pending', createdAt: '2026-07-05', lat: 37.5, lng: -122.2 },
      ...prev,
    ]);
  };
  const updateProperty = (id: string, data: any) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  const deleteProperty = (id: string) => setProperties((prev) => prev.filter((p) => p.id !== id));
  const approveProperty = (id: string) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'Approved' } : p)));
  const rejectProperty = (id: string) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'Rejected' } : p)));
  const toggleUserStatus = (id: string) =>
    setUserList((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={setView} role={role} onRoleChange={setRole} />

      <main className="flex-1">
        {view.name === 'home' && (
          <HomePage
            properties={properties.filter((p) => p.status === 'Approved')}
            onOpen={(id) => setView({ name: 'details', propertyId: id })}
            onSearch={goToListingsWithSearch}
            onSeeAll={() => setView({ name: 'listings' })}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
        )}

        {view.name === 'listings' && (
          <ListingsPage
            allProperties={properties}
            initialFilters={listingFilters}
            onOpen={(id) => setView({ name: 'details', propertyId: id })}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
        )}

        {view.name === 'details' && activeProperty && activeAgent && (
          <PropertyDetails
            property={activeProperty}
            agent={activeAgent}
            onBack={() => setView({ name: 'listings' })}
            saved={savedIds.includes(activeProperty.id)}
            onToggleSave={toggleSave}
          />
        )}

        {view.name === 'dashboard' && role !== 'guest' && (
          <Dashboards
            role={role}
            properties={properties}
            users={userList}
            inquiries={inquiries}
            savedSearches={savedSearches}
            tourRequests={tourRequests}
            savedIds={savedIds}
            onOpen={(id) => setView({ name: 'details', propertyId: id })}
            onToggleSave={toggleSave}
            onCreateProperty={createProperty}
            onUpdateProperty={updateProperty}
            onDeleteProperty={deleteProperty}
            onApproveProperty={approveProperty}
            onRejectProperty={rejectProperty}
            onToggleUserStatus={toggleUserStatus}
            stats={platformStats}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
