import React, { useState } from 'react';
import { User, Complaint } from '../types';
import { ArrowLeft, Send, Shield, Upload } from 'lucide-react';

interface ComplaintFormProps {
  user: User;
  onSubmit: (complaint: Complaint) => void;
  onCancel: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ user, onSubmit, onCancel }) => {
  const [category, setCategory] = useState('academic');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [confirmAnonymity, setConfirmAnonymity] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const categories = [
    'academic',
    'administrative',
    'facilities',
    'harassment',
    'discrimination',
    'safety',
    'financial',
    'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmAnonymity) {
      alert('ERROR: ANONYMITY CONFIRMATION REQUIRED');
      return;
    }

    const complaintId = Math.random().toString(36).substring(2, 12).toUpperCase();
    
    const newComplaint: Complaint = {
      id: complaintId,
      userId: user.id,
      category,
      description,
      priority,
      status: 'submitted',
      createdAt: new Date(),
      updatedAt: new Date(),
      anonymousEmail: user.email
    };

    setGeneratedId(complaintId);
    setShowConfirmation(true);
    
    setTimeout(() => {
      onSubmit(newComplaint);
    }, 3000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="border border-green-400 p-8 max-w-lg">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold mb-4">COMPLAINT SUBMITTED SUCCESSFULLY</h2>
            
            <div className="border border-green-400 p-4 mb-4 bg-green-400 bg-opacity-10">
              <p className="text-sm mb-2">GENERATED COMPLAINT ID:</p>
              <p className="text-lg font-bold text-green-300">{generatedId}</p>
            </div>

            <div className="text-sm text-green-300">
              <p className="mb-2">CONFIRMATION EMAIL WILL BE SENT TO:</p>
              <p className="font-bold">{user.email}</p>
            </div>

            <div className="mt-6 text-xs opacity-75">
              <p>&gt; ENCRYPTING DATA...</p>
              <p>&gt; ANONYMIZING USER INFO...</p>
              <p>&gt; FORWARDING TO ADMINISTRATION...</p>
              <p className="text-green-300 font-bold">&gt; TRANSMISSION COMPLETE</p>
            </div>

            <div className="flex justify-center items-center mt-4 space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-400 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-400 p-4">
        <div className="flex items-center">
          <button
            onClick={onCancel}
            className="border border-green-400 px-4 py-2 mr-4 hover:bg-green-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            [BACK]
          </button>
          <div>
            <h1 className="text-xl font-bold">GRIEVANCE SUBMISSION TERMINAL</h1>
            <p className="text-sm text-green-300">SECURE FORM - ANONYMOUS SUBMISSION</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl">
          {/* Privacy Notice */}
          <div className="border border-green-400 p-4 mb-6 bg-green-400 bg-opacity-5">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-bold">PRIVACY PROTOCOL ACTIVE</span>
            </div>
            <p className="text-xs text-green-300">
              Your identity will be anonymized. Only complaint ID and content will be visible to administrators.
            </p>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-3">
              &gt; SELECT_CATEGORY:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase().replace('-', '_')}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-3">
              &gt; DETAILED_DESCRIPTION:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono h-32 resize-none"
              placeholder="Describe your grievance in detail..."
              required
            />
            <div className="text-xs text-green-300 mt-1">
              Characters: {description.length}/1000
            </div>
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-3">
              &gt; PRIORITY_LEVEL:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`border-2 p-3 font-mono transition-colors ${
                    priority === p
                      ? 'border-green-300 bg-green-400 bg-opacity-20 text-green-300'
                      : 'border-green-400 hover:border-green-300'
                  }`}
                >
                  {p.toUpperCase()}
                  {p === 'urgent' && <span className="text-red-400 ml-2">⚠</span>}
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Simulation */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-3">
              &gt; ATTACHMENTS: (OPTIONAL)
            </label>
            <div className="border border-green-400 p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm text-green-300">FILE UPLOAD SIMULATED</p>
              <p className="text-xs opacity-75">Max 10MB • PDF, DOC, IMG formats</p>
            </div>
          </div>

          {/* Anonymity Confirmation */}
          <div className="mb-6">
            <div className="border border-green-400 p-4 bg-green-400 bg-opacity-5">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmAnonymity}
                  onChange={(e) => setConfirmAnonymity(e.target.checked)}
                  className="mr-3 mt-1"
                  required
                />
                <div className="text-sm">
                  <span className="font-bold">CONFIRM ANONYMITY PROTOCOL</span>
                  <p className="text-xs text-green-300 mt-1">
                    I understand that this complaint will be submitted anonymously. 
                    Only the complaint ID will be used for tracking purposes.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full border-2 border-green-400 p-4 hover:bg-green-400 hover:text-black transition-colors font-bold"
          >
            <Send className="w-5 h-5 inline mr-2" />
            [TRANSMIT_GRIEVANCE]
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;