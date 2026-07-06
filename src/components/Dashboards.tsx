import type { AppUser, Inquiry, Property, Role, SavedSearch, TourRequest } from '../types';
import CustomerDashboard from './dashboards/CustomerDashboard';
import AgentDashboard from './dashboards/AgentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

interface Props {
  role: Role;
  properties: Property[];
  users: AppUser[];
  inquiries: Inquiry[];
  savedSearches: SavedSearch[];
  tourRequests: TourRequest[];
  savedIds: string[];
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
  onCreateProperty: (data: any) => void;
  onUpdateProperty: (id: string, data: any) => void;
  onDeleteProperty: (id: string) => void;
  onApproveProperty: (id: string) => void;
  onRejectProperty: (id: string) => void;
  onToggleUserStatus: (id: string) => void;
  stats: { totalUsers: number; totalProperties: number; totalAgents: number; monthlyLeads: number };
}

export default function Dashboards(props: Props) {
  const { role, properties, savedIds, onOpen, onToggleSave } = props;

  if (role === 'customer') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <CustomerDashboard
          savedProperties={properties.filter((p) => savedIds.includes(p.id))}
          savedSearches={props.savedSearches}
          tourRequests={props.tourRequests}
          allProperties={properties}
          onOpen={onOpen}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      </div>
    );
  }

  if (role === 'agent') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <AgentDashboard
          agentId="a1"
          properties={properties}
          inquiries={props.inquiries}
          onOpen={onOpen}
          onCreateProperty={props.onCreateProperty}
          onUpdateProperty={props.onUpdateProperty}
          onDeleteProperty={props.onDeleteProperty}
        />
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <AdminDashboard
          properties={properties}
          users={props.users}
          stats={props.stats}
          onApprove={props.onApproveProperty}
          onReject={props.onRejectProperty}
          onOpen={onOpen}
          onToggleUserStatus={props.onToggleUserStatus}
        />
      </div>
    );
  }

  return null;
}
