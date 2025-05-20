import { useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Asset Maintenance</h1>
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}