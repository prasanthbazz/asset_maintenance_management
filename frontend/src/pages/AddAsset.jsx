import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {addAsset} from "@/services/api"

function AddAsset() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    tagId: '',
    location: '',
    typeId: '',
    maintenanceCycleInDays: 30,
    lastMaintenanceTime: ''
  });
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  
  // These would come from the backend in a real application
  // Comment: Adding/editing asset types would be future scope
  const assetTypes = [
    { id: 1, name: 'Wheelchair' },
    { id: 2, name: 'Cot' },
    { id: 3, name: 'Bed' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Format date to ISO string for the API
    const isoDate = date ? date.toISOString() : '';
    setFormData({
      ...formData,
      lastMaintenanceTime: isoDate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addAsset(formData);
      // if (!response.ok) {
      //   throw new Error('Failed to add asset');
      // }
      
      //const data = await response.json();
      console.log('Asset added:', formData);
      alert('Asset added successfully!');
      navigate('/assets');
    } catch (error) {
      console.error('Error adding asset:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Asset</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Asset Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tagId" className="text-sm font-medium">
                Tag ID
              </label>
              <Input
                id="tagId"
                name="tagId"
                value={formData.tagId}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="typeId" className="text-sm font-medium">
                Type
              </label>
              <select
                id="typeId"
                name="typeId"
                className="w-full rounded-md border border-input px-3 py-2 bg-background"
                value={formData.typeId}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {assetTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="maintenanceCycleInDays" className="text-sm font-medium">
                Maintenance Cycle (days)
              </label>
              <Input
                id="maintenanceCycleInDays"
                name="maintenanceCycleInDays"
                type="number"
                value={formData.maintenanceCycleInDays}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastMaintenanceTime" className="text-sm font-medium">
                Last Maintenance Time
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/assets')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Asset'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAsset;