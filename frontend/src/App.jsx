import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { useAuthStore } from './store/auth';
import AssetList from './pages/AssetList';
import AddAsset from './pages/AddAsset';
import MaintenanceApproval from './pages/MaintenanceList';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><div>Dashboard under development</div></PrivateRoute>} />
        <Route path="/assets" element={<PrivateRoute> <AssetList /></PrivateRoute>} />
        <Route path="/assets/add" element={<PrivateRoute><AddAsset /></PrivateRoute>}/>
        <Route path="/maintenance"element={<PrivateRoute><MaintenanceApproval /></PrivateRoute>}/>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  if(!token) {
    return <Navigate to="/login" />;
  }
  return(
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default App;



/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from "./pages/NotFound";
import AssetList from './pages/AssetList';
import AddAsset from './pages/AddAsset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/assets" element={<ProtectedRoute><AssetList /></ProtectedRoute>} />
        <Route path="/assets/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
        {// ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
*/
