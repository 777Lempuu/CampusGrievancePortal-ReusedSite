import React, { useState } from 'react';
import { User, Complaint } from '../types';
import ComplaintForm from './ComplaintForm';
import ComplaintTracker from './ComplaintTracker';
import { Plus, Minus, LogOut, FileText, AlertCircle } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  complaints: Complaint[];
  onUpdateComplaints: (complaints: Complaint[]) => void;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  complaints,
  onUpdateComplaints,
  onLogout
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  const handleAddComplaint = (newComplaint: Complaint) => {
    const allComplaints = JSON.parse(localStorage.getItem('grievance_complaints') || '[]');
    const updatedComplaints = [...allComplaints, newComplaint];
    localStorage.setItem('grievance_complaints', JSON.stringify(updatedComplaints));
    onUpdateComplaints(updatedComplaints);
    setShowForm(false);
  };

  const handleRemoveComplaint = () => {
    if (complaints.length === 0) {
      alert('ERROR: NO COMPLAINTS TO REMOVE');
      return;
    }

    if (selectedComplaint) {
      const allComplaints = JSON.parse(localStorage.getItem('grievance_complaints') || '[]');
      const updatedComplaints = allComplaints.filter((c: Complaint) => c.id !== selectedComplaint);
      onUpdateComplaints(updatedComplaints);
      setSelectedComplaint(null);
    } else {
      alert('ERROR: SELECT A COMPLAINT TO REMOVE');
    }
  };

  if (showForm) {
    return (
      <ComplaintForm
        user={user}
        onSubmit={handleAddComplaint}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-400 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">GRIEVANCE TERMINAL - USER MODE</h1>
            <p className="text-sm text-green-300">
              USER: {user.name.toUpperCase()} | ROLE: {user.role.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="border border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition-colors"
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            [LOGOUT]
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Action Panel */}
        <div className="border border-green-400 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">COMPLAINT MANAGEMENT SYSTEM</h2>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="border-2 border-green-400 p-6 hover:bg-green-400 hover:text-black transition-colors flex-1"
            >
              <Plus className="w-12 h-12 mx-auto mb-2" />
              <div className="text-lg font-bold">[ADD COMPLAINT]</div>
              <div className="text-xs mt-2">Submit new grievance</div>
            </button>

            <button
              onClick={handleRemoveComplaint}
              className="border-2 border-green-400 p-6 hover:bg-red-500 hover:border-red-500 hover:text-black transition-colors flex-1"
              disabled={complaints.length === 0}
            >
              <Minus className="w-12 h-12 mx-auto mb-2" />
              <div className="text-lg font-bold">[REMOVE COMPLAINT]</div>
              <div className="text-xs mt-2">
                {complaints.length === 0 ? 'No complaints to remove' : 'Delete selected grievance'}
              </div>
            </button>
          </div>

          <div className="text-xs text-green-300 border border-green-400 p-3 bg-green-400 bg-opacity-5">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            STATUS: {complaints.length} ACTIVE COMPLAINTS | ANONYMITY: ENABLED | ENCRYPTION: ACTIVE
          </div>
        </div>

        {/* Complaints List */}
        <div className="border border-green-400 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            YOUR GRIEVANCES
          </h2>

          {complaints.length === 0 ? (
            <div className="text-center p-8 border border-green-400 bg-green-400 bg-opacity-5">
              <p className="text-green-300">NO ACTIVE COMPLAINTS</p>
              <p className="text-xs mt-2">Use the [ADD COMPLAINT] function to submit a grievance</p>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className={`border p-4 cursor-pointer transition-colors ${
                    selectedComplaint === complaint.id
                      ? 'border-green-300 bg-green-400 bg-opacity-10'
                      : 'border-green-400 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedComplaint(
                    selectedComplaint === complaint.id ? null : complaint.id
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">GRIEVANCE ID: {complaint.id.toUpperCase()}</h3>
                      <p className="text-sm text-green-300">CATEGORY: {complaint.category.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        complaint.status === 'resolved' ? 'text-green-300' :
                        complaint.status === 'investigating' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        STATUS: {complaint.status.toUpperCase().replace('-', '_')}
                      </div>
                      <div className="text-xs text-green-300">
                        PRIORITY: {complaint.priority.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <ComplaintTracker complaint={complaint} />

                  {selectedComplaint === complaint.id && (
                    <div className="mt-4 p-4 border border-green-300 bg-green-400 bg-opacity-5">
                      <p className="text-sm mb-2">DESCRIPTION:</p>
                      <p className="text-xs text-green-300 mb-3">{complaint.description}</p>
                      
                      {complaint.adminFeedback && (
                        <>
                          <p className="text-sm mb-2">ADMIN FEEDBACK:</p>
                          <p className="text-xs text-green-300">{complaint.adminFeedback}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;