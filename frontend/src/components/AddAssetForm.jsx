import { useState } from 'react';
import { addAsset } from '../services/api';

const AddAssetForm = ({ onClose, onAddSuccess }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [assetTag, setAssetTag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name.trim() || !location.trim() || !assetTag.trim()) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await addAsset({ name, location, assetTag });
      setSuccess('Asset added successfully');
      setName('');
      setLocation('');
      setAssetTag('');
      onAddSuccess();
      setTimeout(onClose, 1000); // Close modal after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add asset. Ensure Asset Tag is unique.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Add New Asset</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} action="#">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="assetTag">Asset Tag</label>
              <input
                type="text"
                id="assetTag"
                value={assetTag}
                onChange={(e) => setAssetTag(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., TAG-12345"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MRI Scanner"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Radiology"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetForm;