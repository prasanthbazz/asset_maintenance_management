import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Navbar = () => {
  const { token, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Asset Maintenance Management</Link>
        {token ? (
          <div className="space-x-4">
            <Link to="/maintenance" className="text-white hover:underline">Maintenance</Link>
            <Link to="/assets" className="text-white hover:underline">Assets</Link>
            <button onClick={handleLogout} className="text-white hover:underline">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;