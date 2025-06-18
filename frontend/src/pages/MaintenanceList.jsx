import React, { useState, useEffect } from 'react';
//import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Accessibility,
  Bed,
  Package2,
  Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPendingMaintenanceRecords } from '@/services/api';
import { approveMaintenanceRecord } from '@/services/api';
import { rejectMaintenanceRecord } from '@/services/api';
//import { toast } from 'sonner';

// Sample data for maintenance reports pending approval
const pendingMaintenance = [
    {
        id: 1,
        asset: {
            id: 1,
            name: "WHEELCHAIR001",
            tagId: "WHC001",
        },
        maintenanceDate: "2025-04-20T10:00:00",
        approvalStatus: "PENDING",
        adminRemarks: null,
        maintenanceResults: [
            {
                id: 1,
                maintenanceRecordId: 1,
                checklistItemId: 1,
                result: "OK",
                comments: null
            },
            {
                id: 2,
                maintenanceRecordId: 1,
                checklistItemId: 2,
                result: "NOT_OK",
                comments: "Brakes need adjustment"
            }
        ]
    },
    {
        id: 2,
        asset: {
            id: 2,
            name: "WHEELCHAIR001",
            tagId: "WHC002",
        },
        maintenanceDate: "2025-04-14T09:00:00",
        approvalStatus: "PENDING",
        adminRemarks: null,
        maintenanceResults: [
            {
                id: 3,
                maintenanceRecordId: 2,
                checklistItemId: 1,
                result: "OK",
                comments: "Good condition"
            }
        ]
    },
    {
        id: 3,
        asset: {
            id: 4,
            name: "COT001",
            tagId: "CT001",
        },
        maintenanceDate: "2025-04-20T14:00:00",
        approvalStatus: "PENDING",
        adminRemarks: null,
        maintenanceResults: [
            {
                id: 4,
                maintenanceRecordId: 3,
                checklistItemId: 1,
                result: "OK",
                comments: null
            }
        ]
    }
]

const MaintenanceApproval = () => {
  //const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReport] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Filter maintenance reports based on search
//   const filteredReports = pendingMaintenance.filter(report => {
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       report.assetName.toLowerCase().includes(searchTerm) ||
//       report.assetTag.toLowerCase().includes(searchTerm) ||
//       report.technician.toLowerCase().includes(searchTerm) ||
//       report.department.toLowerCase().includes(searchTerm)
//     );
//   });
  const fetchPendingMaintenanceRecords = async () => {
      try {
        const maintenanceRecords = await getPendingMaintenanceRecords();
        //const data = await response.json();
        setFilteredReport(maintenanceRecords);
      } catch (error) {
          console.error('Error fetching assets:', error);
      }
  };
  
  useEffect(() => {
    // Simulating data fetching

    fetchPendingMaintenanceRecords();
  }, []);

  // View report details
  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  // Approve maintenance report
  const approveReport = async () => {
    //toast.success(`Maintenance report for ${selectedReport.assetName} #${selectedReport.assetTag} approved`);
    try{
      await approveMaintenanceRecord(selectedReport.id);
      setIsDialogOpen(false);
      fetchPendingMaintenanceRecords();
    }
    catch (error) {
      console.error(error);
    }
  };

  // Reject maintenance report
  const rejectReport = async () => {
    //toast.info(`Maintenance report for ${selectedReport.assetName} #${selectedReport.assetTag} rejected`);
    try{
      await rejectMaintenanceRecord(selectedReport.id);
      setIsDialogOpen(false);
      fetchPendingMaintenanceRecords();
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Approval</h1>
        </div>

        <Card>
            <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                <CardTitle>Pending Approval</CardTitle>
                <CardDescription>Review and approve maintenance reports</CardDescription>
                </div>
            </div>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Issues Found</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <TableRow key={report.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                            <div>
                                <p className="font-medium">{report.asset.name}</p>
                                <p className="text-xs text-muted-foreground">#{report.asset.tagId}</p>
                            </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>{new Date(report.maintenanceDate).toLocaleDateString()}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            {report.maintenanceResults.filter((item) => item.result === 'NOT_OK').length > 0 ? (
                            <Badge className="bg-amber-300 hover:bg-amber-400">
                                {report.maintenanceResults.filter((item) => item.result === 'NOT_OK').length} Issues
                            </Badge>
                            ) : (
                            <Badge className="bg-green-300 hover:bg-green-400">No Issues</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span className="text-amber-500 font-medium">Pending</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => viewReportDetails(report)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <CheckCircle className="h-8 w-8 mb-2" />
                            <p>No reports pending approval</p>
                            <p className="text-sm">All caught up!</p>
                        </div>
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            </CardContent>
        </Card>

        {/* Report detail dialog */}
        {selectedReport && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-lg bg-white opacity-100 rounded-xl">
                <DialogHeader>
                <DialogTitle>Maintenance Report</DialogTitle>
                <DialogDescription>
                    Review maintenance details for {selectedReport.asset.name} #{selectedReport.asset.tagId}
                </DialogDescription>
                </DialogHeader>
                
            <div className="space-y-4">
                {/* Report header */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(selectedReport.maintenanceDate).toLocaleDateString()}</p>
                    </div>
                </div>
                
                {/* Checklist results */}
                <div>
                    <h4 className="text-sm font-medium mb-2">Checklist Results</h4>
                    <div className="bg-muted rounded-md p-3 space-y-3">
                    {selectedReport.maintenanceResults.map((issue, index) => (
                        <div key={index} className={`flex items-start justify-between pb-3 ${
                        index !== selectedReport.maintenanceResults.length - 1 ? "border-b border-border" : ""
                        }`}>
                        <div>
                            <p className="font-medium">{issue.checklistItemTask}</p>
                            {issue.comments && <p className="text-sm text-muted-foreground">{issue.comments}</p>}
                        </div>
                        <Badge className={`${
                            issue.result === 'OK' ? "bg-green-300 hover:bg-green-400" : "bg-amber-300 hover:bg-amber-400"
                        }`}>
                            {issue.result}
                        </Badge>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* Spares used */}
            </div>
                
                <DialogFooter className="flex space-x-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                </Button>
                <Button variant="secondary" onClick={rejectReport}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                </Button>
                <Button onClick={approveReport}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}
    </div>
  );
};

export default MaintenanceApproval;
