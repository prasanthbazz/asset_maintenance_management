// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch (e) {
      localStorage.removeItem('token');
      return false;
    }
};

export default function ProtectedRoute({ children }) {
  return isTokenValid() ? children : <Navigate to="/" replace />;
}