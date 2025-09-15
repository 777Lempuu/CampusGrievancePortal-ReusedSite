import React from 'react';
import { Complaint } from '../types';
import { CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';

interface ComplaintTrackerProps {
  complaint: Complaint;
}

const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({ complaint }) => {
  const statuses = [
    { key: 'submitted', label: 'SUBMITTED', icon: Circle },
    { key: 'under-review', label: 'UNDER REVIEW', icon: Clock },
    { key: 'assigned', label: 'ASSIGNED', icon: AlertTriangle },
    { key: 'investigating', label: 'INVESTIGATING', icon: Clock },
    { key: 'resolved', label: 'RESOLVED', icon: CheckCircle },
    { key: 'archived', label: 'ARCHIVED', icon: CheckCircle }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === complaint.status);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isActive = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          
          return (
            <React.Fragment key={status.key}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded border-2 flex items-center justify-center
                  ${isActive 
                    ? 'border-green-400 bg-green-400 text-black' 
                    : 'border-green-400 text-green-400'
                  }
                  ${isCurrent ? 'animate-pulse' : ''}
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`
                  text-xs mt-1 font-mono
                  ${isActive ? 'text-green-300' : 'text-green-600'}
                `}>
                  {status.label}
                </span>
              </div>
              
              {index < statuses.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2
                  ${index < currentStatusIndex 
                    ? 'bg-green-400' 
                    : 'bg-green-600'
                  }
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="mt-2 text-xs text-center">
        <span className="text-green-300">
          LAST UPDATED: {complaint.updatedAt.toLocaleDateString()} {complaint.updatedAt.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ComplaintTracker;