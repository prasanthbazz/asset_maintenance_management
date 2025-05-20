import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403) && error.config.url !== '/auth/login') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  };

  export const getAssets = async () => {
    const response = await api.get('/assets');
    return response.data;
  };
  
  export const addAsset = async (asset) => {
    const response = await api.post('/assets', asset);
    return response.data;
  };

  export const getPendingMaintenanceRecords = async () => {
    const response = await api.get('/maintenance-records/pending');
    return response.data;
  }

  export const approveMaintenanceRecord = async (id) => {
    const response = await api.patch(`/maintenance-records/${id}/approve`);
    return response.data;
  }

  export const rejectMaintenanceRecord = async (id) => {
    const response = await api.patch(`/maintenance-records/${id}/reject`);
    return response.data;
  }
  
  export default api;