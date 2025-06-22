import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { EyeIcon } from '../components/ui/icons'
import { getPendingMaintenanceRecords, getApprovedMaintenanceRecords, approveMaintenanceRecord,  rejectMaintenanceRecord} from '@/services/api';
import { ApprovalStatus, getStatusBadgeClassName } from '@/constants/maintenance';
import { MaintenanceRecordView } from '../components/maintenance/MaintenanceRecordView'

const Maintenance = () => {

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingMaintenanceRecords, setPendingMaintenanceRecords] = useState([]);
    const [approvedMaintenanceRecords, setApprovedMaintenanceRecords] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");
    const [isPendingFetched, setIsPendingFetched] = useState(false);
    const [isApprovedFetched, setIsApprovedFetched] = useState(false);
    const [recordsToDisplay, setRecordsToDisplay] = useState([]);

    const fetchPendingMaintenanceRecords = async () => {
          try {
            const maintenanceRecords = await getPendingMaintenanceRecords();
            //const data = await response.json();
            setIsPendingFetched(true);
            setPendingMaintenanceRecords(maintenanceRecords);
          } catch (error) {
              console.error('fetchPendingMaintenanceRecords : Error fetching pending maintenance records:', error);
          }
    };

    const fetchApprovedMaintenanceRecords = async () => {
          try {
            const maintenanceRecords = await getApprovedMaintenanceRecords();
            setIsApprovedFetched(true);
            setApprovedMaintenanceRecords(maintenanceRecords);
          } catch (error) {
              console.error('fetchApprovedMaintenanceRecords : Error fetching approved maintenance records:', error);
          }
    };

    useEffect(() => {
        if (activeTab === "pending" && !isPendingFetched) {
            fetchPendingMaintenanceRecords();
        } else if (activeTab === "approved" && !isApprovedFetched) {
            fetchApprovedMaintenanceRecords();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "pending" && isPendingFetched) {
            setRecordsToDisplay(pendingMaintenanceRecords);
        } else if (activeTab === "approved" && isApprovedFetched) {
            setRecordsToDisplay(approvedMaintenanceRecords);
        }
    }, [activeTab, isPendingFetched, isApprovedFetched, pendingMaintenanceRecords, approvedMaintenanceRecords]);

    const removeFromPendingMaintenanceRecords = (id) => {
        setPendingMaintenanceRecords(pendingMaintenanceRecords.filter((record) => record.id !== id));
    }

    const addToApprovedMaintenanceRecords = (maintenanceRecord) => {
        setApprovedMaintenanceRecords([...approvedMaintenanceRecords, maintenanceRecord]);
    }

    const handleApprove = async (recordId, remarks) => {

        try {
            //setIsLoading(true);
            const approvedRecord = await approveMaintenanceRecord(recordId, {'adminRemarks': remarks});
            removeFromPendingMaintenanceRecords(recordId);
            addToApprovedMaintenanceRecords(approvedRecord);
            handleModalClose();
            //setIsLoading(false);
        } catch(error) {
            console.error("Approval failed", error);
            alert("Failed to approve maintenance record.");
        }
    };

    const handleReject = async (recordId, remarks) => {
        try {
            //setIsLoading(true);
            await rejectMaintenanceRecord(recordId, {'adminRemarks': remarks});
            removeFromPendingMaintenanceRecords(recordId);
            handleModalClose();
            //setIsLoading(false);
        } catch(error) {
            console.error("Reject failed", error);
            alert("Failed to reject maintenance record.");
        }
    };

    const handleViewMaintenanceRecord = (record) => {
        setIsModalOpen(true);
        setSelectedRecord(record);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    return(
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Maintenance Records</h1>

            <div className="mb-6">
                <div className="flex border-b border-gray-300">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`py-3 px-6 font-medium text-sm transition-colors ${activeTab === 'pending' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Pending Approval
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`py-3 px-6 font-medium text-sm transition-colors ${activeTab === 'approved' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    All Approved
                </button>
                </div>
            </div>
            
            <Card className="shadow-md">
                {recordsToDisplay.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                        {activeTab === 'pending' ? 'No maintenance records pending approval.' : 'No maintenance records found.'}
                    </p>
                ) : (
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance Date</th>
                        {/*<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>*/}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {recordsToDisplay.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{record.asset?.name || 'N/A'}</div>
                            <div className="text-xs text-gray-500">{record.asset?.tagId || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(parseISO(record.maintenanceDate), 'dd/MM/yyyy HH:mm')}
                        </td>
                        {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.technicianName || 'N/A'}</td>*/}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusBadgeClassName(record.approvalStatus)}>{record.approvalStatus}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewMaintenanceRecord(record)} 
                                className="text-sky-500 hover:bg-sky-100" 
                                title={record.approvalStatus === ApprovalStatus.PENDING ? 'Review & Approve' : 'View Details'}
                            >
                                <EyeIcon className="h-5 w-5 mr-1" />
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                )}
            </Card>

            {selectedRecord && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Maintenance Record Details" size="xl">
                    <MaintenanceRecordView record={selectedRecord} onClose={handleModalClose} onApprove={handleApprove} onReject={handleReject}/>
                </Modal>
            )}
            </div>
    )

}

export default Maintenance;