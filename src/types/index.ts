export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin';
}

export interface Complaint {
  id: string;
  userId: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'under-review' | 'assigned' | 'investigating' | 'resolved' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  adminFeedback?: string;
  uploads?: string[];
  anonymousEmail?: string;
}

export type ComplaintStatus = Complaint['status'];