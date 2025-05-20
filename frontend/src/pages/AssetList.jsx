import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PlusCircle, ChevronRight, Filter } from "lucide-react";
import { format, parseISO, startOfDay, differenceInCalendarDays } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
import { getAssets } from "@/services/api"

function AssetList() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([
    // { 
    //   id: 1, 
    //   name: 'ICU Bed A1', 
    //   tagId: 'BED001', 
    //   location: 'ICU Ward', 
    //   typeId: 1, 
    //   type: 'Bed', 
    //   purchaseDate: '2023-01-01', 
    //   maintenanceCycleInDays: 45, 
    //   lastMaintenanceTime: '2025-02-15T00:00:00', 
    //   condition: 'Good' 
    // },
    // { 
    //   id: 2, 
    //   name: 'Wheelchair X3', 
    //   tagId: 'WCH002', 
    //   location: 'Physical Therapy', 
    //   typeId: 2, 
    //   type: 'Wheelchair', 
    //   purchaseDate: '2023-02-15', 
    //   maintenanceCycleInDays: 30, 
    //   lastMaintenanceTime: '2025-04-01T00:00:00', 
    //   condition: 'Excellent' 
    // },
    // { 
    //   id: 3, 
    //   name: 'MRI Machine', 
    //   tagId: 'MRI001', 
    //   location: 'Radiology', 
    //   typeId: 4, 
    //   type: 'Imaging Equipment', 
    //   purchaseDate: '2022-11-10', 
    //   maintenanceCycleInDays: 90, 
    //   lastMaintenanceTime: '2025-01-20T00:00:00', 
    //   condition: 'Needs Repair' 
    // },
    // { 
    //   id: 4, 
    //   name: 'Patient Monitor B2', 
    //   tagId: 'MON003', 
    //   location: 'Emergency Room', 
    //   typeId: 3, 
    //   type: 'Monitor', 
    //   purchaseDate: '2023-03-22', 
    //   maintenanceCycleInDays: 60, 
    //   lastMaintenanceTime: '2025-03-10T00:00:00', 
    //   condition: 'Good' 
    // },
    // { 
    //   id: 5, 
    //   name: 'Wheelchair 1', 
    //   tagId: 'WHC001', 
    //   location: 'Ward A', 
    //   typeId: 2, 
    //   type: 'Wheelchair', 
    //   purchaseDate: '2024-01-05', 
    //   maintenanceCycleInDays: 30, 
    //   lastMaintenanceTime: '2025-03-01T00:00:00', 
    //   condition: 'Excellent' 
    // },
  ]);

  useEffect(() => {
    // Simulating data fetching
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        //const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

    // Filter states
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filters, setFilters] = useState({
    condition: "all_conditions",
    type: "all_types",
    location: "all_locations"
  });

  // Extract unique values for filter options
  const conditions = ['Good', 'Due', 'Overdue'];
  const types = [...new Set(assets.map(asset => asset.assetType))];
  const locations = [...new Set(assets.map(asset => asset.location))];

  useEffect(() => {
    // Apply filters
    const filtered = assets.filter(asset => {
      return (
        (filters.condition === "all_conditions" || getAssetCondition(asset.nextMaintenanceDate) === filters.condition) &&
        (filters.type === "all_types" || asset.assetType === filters.type) &&
        (filters.location === "all_locations" || asset.location === filters.location)
      );
    });
    
    setFilteredAssets(filtered);
  }, [assets, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      condition: "all_conditions",
      type: "all_types",
      location: "all_locations"
    });
  };

  const getAssetCondition = (nextMaintenanceDateStr) => {
    const nextDate = startOfDay(parseISO(nextMaintenanceDateStr));
    const today = startOfDay(new Date());

    const diffInDays = differenceInCalendarDays(nextDate, today);

    if (diffInDays > 7) return 'Good';
    if (diffInDays >= 0) return 'Due';
    return 'Overdue';
  };

  const getConditionBadgeClass = (condition) => {
    switch (condition) {
      case 'Good':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
      case 'Due':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-blue-800';
      case 'Overdue':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
      default:
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const handleViewHistory = (assetId) => {
    navigate(`/assets/${assetId}/history`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asset Management</h1>
        <Link to="/assets/add">
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Asset
          </Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" /> Filters
          </h2>
          
          <div className="flex-grow flex flex-wrap gap-4">
            <Select
              value={filters.condition}
              onValueChange={(value) => handleFilterChange("condition", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_conditions">All Conditions</SelectItem>
                {conditions.map(condition => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange("location", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_locations">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {(filters.condition !== "all_conditions" || filters.type !== "all_types" || filters.location !== "all_locations") && (
            <Button 
              variant="outline" 
              onClick={clearFilters} 
              className="ml-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Tag ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Cycle (days)</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.tagId}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.assetType}</TableCell>
                  <TableCell>{formatDate(asset.lastMaintenanceTime)}</TableCell>
                  <TableCell>{asset.maintenanceCycleInDays}</TableCell>
                  <TableCell>
                    <span className={getConditionBadgeClass(getAssetCondition(asset.nextMaintenanceDate))}>
                      {getAssetCondition(asset.nextMaintenanceDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewHistory(asset.id)}
                      className="flex items-center gap-1"
                    >
                      View History <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No assets found matching the selected filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AssetList;