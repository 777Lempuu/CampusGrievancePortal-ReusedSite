import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User, Complaint } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Load complaints from localStorage
    const savedComplaints = localStorage.getItem('grievance_complaints');
    if (savedComplaints) {
      const parsedComplaints = JSON.parse(savedComplaints);
      // Convert date strings back to Date objects
      const complaintsWithDates = parsedComplaints.map((complaint: Complaint) => ({
        ...complaint,
        createdAt: new Date(complaint.createdAt),
        updatedAt: new Date(complaint.updatedAt)
      }));
      setComplaints(complaintsWithDates);
    }
  }, []);

  const handleLogin = (user: User) => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setCurrentUser(user);
      setIsLoading(false);
    }, 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const updateComplaints = (newComplaints: Complaint[]) => {
    setComplaints(newComplaints);
    localStorage.setItem('grievance_complaints', JSON.stringify(newComplaints));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard 
        complaints={complaints} 
        onUpdateComplaints={updateComplaints}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <UserDashboard 
      user={currentUser}
      complaints={complaints.filter(c => c.userId === currentUser.id || c.anonymousEmail === currentUser.email)}
      onUpdateComplaints={updateComplaints}
      onLogout={handleLogout}
    />
  );
}

export default App;