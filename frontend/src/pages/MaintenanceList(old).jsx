import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
//import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

function MaintenanceList() {
  const [pendingMaintenance, setPendingMaintenance] = useState([
    {
      id: 101,
      assetId: 1,
      assetName: 'ICU Bed A1',
      scheduledDate: '2025-05-15',
      urgency: 'Normal'
    },
    {
      id: 102,
      assetId: 3,
      assetName: 'MRI Machine',
      scheduledDate: '2025-05-12',
      urgency: 'High'
    },
    {
      id: 103,
      assetId: 5,
      assetName: 'Ultrasound Unit',
      scheduledDate: '2025-05-20',
      urgency: 'Low'
    }
  ]);

  const [completedMaintenance, setCompletedMaintenance] = useState([
    {
      id: 201,
      assetId: 2,
      assetName: 'Wheelchair X3',
      completedDate: '2025-05-01',
      notes: 'Replaced wheels and bearings',
      technician: 'John Smith'
    },
    {
      id: 202,
      assetId: 4,
      assetName: 'Patient Monitor B2',
      completedDate: '2025-04-25',
      notes: 'Calibrated and updated firmware',
      technician: 'Sarah Johnson'
    }
  ]);

  // Generate maintenance calendar data
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMaintenance, setCalendarMaintenance] = useState({});

  useEffect(() => {
    // Create some sample data for the calendar
    const calendar = {};
    
    // Add pending maintenance to calendar
    pendingMaintenance.forEach(item => {
      const dateKey = item.scheduledDate;
      if (!calendar[dateKey]) {
        calendar[dateKey] = [];
      }
      calendar[dateKey].push(item);
    });
    
    // Add some overdue maintenance
    const overdueDates = ['2025-05-01', '2025-05-05', '2025-05-08'];
    overdueDates.forEach((date, index) => {
      if (!calendar[date]) {
        calendar[date] = [];
      }
      calendar[date].push({
        id: 300 + index,
        assetId: 6 + index,
        assetName: `Overdue Asset ${index + 1}`,
        scheduledDate: date,
        urgency: 'High',
        isOverdue: true
      });
    });
    
    setCalendarMaintenance(calendar);
  }, [pendingMaintenance]);

  useEffect(() => {
    // Simulating data fetching for pending maintenance
    const fetchPendingMaintenance = async () => {
      /* Commented API call implementation for future use
      try {
        const response = await fetch('/api/maintenance/pending', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch pending maintenance tasks');
        }
        
        const data = await response.json();
        setPendingMaintenance(data);
      } catch (error) {
        console.error('Error fetching pending maintenance:', error);
      }
      */
    };

    // Simulating data fetching for completed maintenance
    const fetchCompletedMaintenance = async () => {
      /* Commented API call implementation for future use
      try {
        const response = await fetch('/api/maintenance/completed', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch completed maintenance tasks');
        }
        
        const data = await response.json();
        setCompletedMaintenance(data);
      } catch (error) {
        console.error('Error fetching completed maintenance:', error);
      }
      */
    };

    fetchPendingMaintenance();
    fetchCompletedMaintenance();
  }, []);

  const handleApprove = async (id) => {
    // In a real app, this would make an API call
    console.log(`Approving maintenance with ID: ${id}`);
    
    // Update local state to remove the approved item
    setPendingMaintenance(pendingMaintenance.filter(item => item.id !== id));
    
    /* Commented API call implementation for future use
    try {
      const response = await fetch(`/api/maintenance/approve/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve maintenance');
      }
      
      // Remove approved item from list
      setPendingMaintenance(pendingMaintenance.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error approving maintenance:', error);
    }
    */
  };

  const handleReject = async (id) => {
    // In a real app, this would make an API call
    console.log(`Rejecting maintenance with ID: ${id}`);
    
    // Update local state to remove the rejected item
    setPendingMaintenance(pendingMaintenance.filter(item => item.id !== id));
    
    /* Commented API call implementation for future use
    try {
      const response = await fetch(`/api/maintenance/reject/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject maintenance');
      }
      
      // Remove rejected item from list
      setPendingMaintenance(pendingMaintenance.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error rejecting maintenance:', error);
    }
    */
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
      case 'Normal':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
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

  const renderMaintenanceForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const maintenanceItems = calendarMaintenance[dateKey] || [];
    
    if (maintenanceItems.length === 0) {
      return (
        <div className="text-center p-6 text-gray-500">
          No maintenance scheduled for this date.
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">
          Maintenance for {format(date, 'MMMM d, yyyy')}
        </h3>
        <div className="text-sm font-medium">
          {maintenanceItems.length} {maintenanceItems.length === 1 ? 'asset' : 'assets'} scheduled
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.assetName}</TableCell>
                <TableCell>
                  {item.isOverdue ? (
                    <span className="flex items-center text-red-500 font-medium">
                      <AlertCircle className="h-4 w-4 mr-1" /> Overdue
                    </span>
                  ) : (
                    <span className="flex items-center text-blue-500 font-medium">
                      <CalendarIcon className="h-4 w-4 mr-1" /> Scheduled
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={getUrgencyClass(item.urgency)}>
                    {item.urgency}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Calculate days with maintenance for the calendar
  const maintenanceDates = Object.keys(calendarMaintenance).map(date => new Date(date));

  return (
    <div className="container mx-auto py-6">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold">Maintenance Management</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        {/* Pending Tab */}
        <TabsContent value="pending">
          {pendingMaintenance.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center p-6 text-gray-500">No pending maintenance tasks.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingMaintenance.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.assetName}</TableCell>
                        <TableCell>{formatDate(item.scheduledDate)}</TableCell>
                        <TableCell>
                          <span className={getUrgencyClass(item.urgency)}>
                            {item.urgency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleApprove(item.id)}
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button
                              onClick={() => handleReject(item.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Completed Tab */}
        <TabsContent value="completed">
          {completedMaintenance.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center p-6 text-gray-500">No completed maintenance tasks.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Completed Date</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedMaintenance.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.assetName}</TableCell>
                        <TableCell>{formatDate(item.completedDate)}</TableCell>
                        <TableCell>{item.technician}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Calendar Tab */}
        {/* <TabsContent value="calendar">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="pointer-events-auto"
                  modifiers={{
                    maintenance: maintenanceDates,
                    overdue: maintenanceDates.filter(date => date < new Date())
                  }}
                  modifiersClassNames={{
                    maintenance: "bg-blue-100 text-blue-900 hover:bg-blue-200",
                    overdue: "bg-red-100 text-red-900 hover:bg-red-200"
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                {renderMaintenanceForDate(selectedDate)}
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

export default MaintenanceList;