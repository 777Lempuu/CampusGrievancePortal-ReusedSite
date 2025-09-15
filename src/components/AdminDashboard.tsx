import React, { useState } from 'react';
import { Complaint } from '../types';
import { LogOut, Settings, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

interface AdminDashboardProps {
  complaints: Complaint[];
  onUpdateComplaints: (complaints: Complaint[]) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  complaints,
  onUpdateComplaints,
  onLogout
}) => {
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [newStatus, setNewStatus] = useState<Complaint['status']>('submitted');

  const updateComplaintStatus = (complaintId: string, status: Complaint['status'], adminFeedback?: string) => {
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === complaintId
        ? {
            ...complaint,
            status,
            updatedAt: new Date(),
            adminFeedback: adminFeedback || complaint.adminFeedback
          }
        : complaint
    );
    onUpdateComplaints(updatedComplaints);
  };

  const handleStatusUpdate = () => {
    if (selectedComplaint) {
      updateComplaintStatus(selectedComplaint, newStatus, feedback);
      setFeedback('');
      setSelectedComplaint(null);
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'submitted': return 'text-blue-400';
      case 'under-review': return 'text-yellow-400';
      case 'assigned': return 'text-orange-400';
      case 'investigating': return 'text-purple-400';
      case 'resolved': return 'text-green-300';
      case 'archived': return 'text-gray-400';
      default: return 'text-green-400';
    }
  };

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'submitted': return Clock;
      case 'under-review': return AlertTriangle;
      case 'assigned': return Users;
      case 'investigating': return Settings;
      case 'resolved': return CheckCircle;
      case 'archived': return CheckCircle;
      default: return Clock;
    }
  };

  const selectedComplaintData = complaints.find(c => c.id === selectedComplaint);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-400 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">ADMINISTRATIVE COMMAND CENTER</h1>
            <p className="text-sm text-green-300">
              GRIEVANCE OVERSIGHT SYSTEM | TOTAL CASES: {complaints.length}
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

      <div className="flex h-full">
        {/* Complaints List */}
        <div className="w-1/2 p-6 border-r border-green-400">
          <h2 className="text-lg font-bold mb-4">ACTIVE GRIEVANCES</h2>
          
          {complaints.length === 0 ? (
            <div className="text-center p-8 border border-green-400 bg-green-400 bg-opacity-5">
              <p className="text-green-300">NO ACTIVE COMPLAINTS</p>
              <p className="text-xs mt-2">System monitoring for new submissions...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-screen overflow-y-auto">
              {complaints.map((complaint) => {
                const StatusIcon = getStatusIcon(complaint.status);
                
                return (
                  <div
                    key={complaint.id}
                    className={`border p-4 cursor-pointer transition-colors ${
                      selectedComplaint === complaint.id
                        ? 'border-green-300 bg-green-400 bg-opacity-10'
                        : 'border-green-400 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedComplaint(complaint.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm">ID: {complaint.id}</h3>
                        <p className="text-xs text-green-300">{complaint.category.toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center text-xs ${getStatusColor(complaint.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {complaint.status.toUpperCase().replace('-', '_')}
                        </div>
                        <div className={`text-xs mt-1 ${
                          complaint.priority === 'urgent' ? 'text-red-400' :
                          complaint.priority === 'high' ? 'text-yellow-400' :
                          'text-green-300'
                        }`}>
                          {complaint.priority.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-green-300 truncate">
                      {complaint.description}
                    </p>
                    
                    <div className="text-xs mt-2 opacity-75">
                      {complaint.createdAt.toLocaleDateString()} {complaint.createdAt.toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Complaint Details & Actions */}
        <div className="w-1/2 p-6">
          {selectedComplaintData ? (
            <div>
              <h2 className="text-lg font-bold mb-4">COMPLAINT DETAILS</h2>
              
              <div className="border border-green-400 p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-green-300">COMPLAINT ID</p>
                    <p className="font-bold">{selectedComplaintData.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-300">CATEGORY</p>
                    <p className="font-bold">{selectedComplaintData.category.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-300">PRIORITY</p>
                    <p className={`font-bold ${
                      selectedComplaintData.priority === 'urgent' ? 'text-red-400' :
                      selectedComplaintData.priority === 'high' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {selectedComplaintData.priority.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-green-300">CURRENT STATUS</p>
                    <p className={`font-bold ${getStatusColor(selectedComplaintData.status)}`}>
                      {selectedComplaintData.status.toUpperCase().replace('-', '_')}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-green-300 mb-2">DESCRIPTION</p>
                  <p className="text-sm border border-green-400 p-3 bg-green-400 bg-opacity-5">
                    {selectedComplaintData.description}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-green-300 mb-2">ANONYMOUS CONTACT</p>
                  <p className="text-sm font-mono">{selectedComplaintData.anonymousEmail}</p>
                </div>

                {selectedComplaintData.adminFeedback && (
                  <div className="mb-4">
                    <p className="text-xs text-green-300 mb-2">PREVIOUS FEEDBACK</p>
                    <p className="text-sm border border-green-400 p-3 bg-green-400 bg-opacity-5">
                      {selectedComplaintData.adminFeedback}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Update Panel */}
              <div className="border border-green-400 p-4">
                <h3 className="font-bold mb-3">UPDATE STATUS</h3>
                
                <div className="mb-4">
                  <label className="block text-xs text-green-300 mb-2">NEW STATUS</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Complaint['status'])}
                    className="w-full bg-black border border-green-400 text-green-400 p-2 text-sm focus:outline-none focus:border-green-300"
                  >
                    <option value="submitted">SUBMITTED</option>
                    <option value="under-review">UNDER REVIEW</option>
                    <option value="assigned">ASSIGNED</option>
                    <option value="investigating">INVESTIGATING</option>
                    <option value="resolved">RESOLVED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-green-300 mb-2">ADMIN FEEDBACK</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-black border border-green-400 text-green-400 p-3 text-sm h-24 resize-none focus:outline-none focus:border-green-300"
                    placeholder="Enter feedback or additional questions for the user..."
                  />
                </div>

                <button
                  onClick={handleStatusUpdate}
                  className="w-full border-2 border-green-400 p-3 hover:bg-green-400 hover:text-black transition-colors font-bold"
                >
                  [UPDATE COMPLAINT STATUS]
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-green-300">SELECT A COMPLAINT TO VIEW DETAILS</p>
              <p className="text-xs opacity-75 mt-2">Click on any complaint from the list to manage</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;