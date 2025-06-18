import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { getAssets } from '../services/api';
import AddAssetForm from '../components/AddAssetForm';
import Navbar from '../components/Navbar';

const AssetManagement = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
        setFilteredAssets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assets');
        setLoading(false);
      }
    };

    fetchAssets();
  }, [token, navigate]);

  // Derive unique locations and types
  const locations = [...new Set(assets.map((asset) => asset.location))].sort();
  const types = ['All', 'Equipment', 'Furniture']; // Adjust based on backend

  // Apply filters and sorting
  useEffect(() => {
    let result = [...assets];

    // Filter by location
    if (locationFilter) {
      result = result.filter((asset) => asset.location === locationFilter);
    }

    // Filter by type (inferred from name)
    if (typeFilter && typeFilter !== 'All') {
      result = result.filter((asset) =>
        typeFilter === 'Equipment'
          ? asset.name.toLowerCase().includes('machine') || asset.name.toLowerCase().includes('scanner')
          : asset.name.toLowerCase().includes('chair') || asset.name.toLowerCase().includes('bed')
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || '';
      const bValue = b[sortField]?.toString().toLowerCase() || '';
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setFilteredAssets(result);
  }, [assets, locationFilter, typeFilter, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setLocationFilter('');
    setTypeFilter('');
  };

  const handleAddSuccess = async () => {
    setShowAddForm(false);
    setLoading(true);
    try {
      const data = await getAssets();
      setAssets(data);
      setFilteredAssets(data);
    } catch (err) {
      setError('Failed to refresh assets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Asset Management</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showAddForm ? 'Close Form' : 'Add Asset'}
          </button>
        </div>

        {showAddForm && <AddAssetForm onAddSuccess={handleAddSuccess} locations={locations} />}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="locationFilter">Location</label>
              <select
                id="locationFilter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="typeFilter">Type</label>
              <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading assets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Assets</h2>
            {filteredAssets.length === 0 ? (
              <p className="text-gray-600">No assets found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th
                        className="px-4 py-2 text-left text-gray-600 cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-gray-600 cursor-pointer"
                        onClick={() => handleSort('location')}
                      >
                        Location {sortField === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600">Created By</th>
                      <th className="px-4 py-2 text-left text-gray-600">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{asset.name}</td>
                        <td className="px-4 py-2">{asset.location}</td>
                        <td className="px-4 py-2">{asset.createdBy}</td>
                        <td className="px-4 py-2">
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagement;