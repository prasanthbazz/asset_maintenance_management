import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuthStore } from '../store/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await login(username, password);
      setAuth(token, { username });
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Asset Maintenance Management System
        </h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="button button-primary w-full mt-4"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Use username: admin, password: admin123 for demo</p>
        </div>
      </form>
    </div>
    // <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    //   <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
    //   {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         required
    //       />
    //     </div>
    //     <div className="mb-6">
    //       <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         required
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
    //     >
    //       Login
    //     </button>
    //   </form>
    // </div>
  );
};

export default LoginForm;


/*-------  CHATGPT code ----------------
import { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    //return <h2 className="text-xl font-semibold text-gray-800">LoginForm works!</h2>;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      console.log("Login success\n");
      navigate('/dashboard');
      // TODO: redirect to dashboard
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
*/