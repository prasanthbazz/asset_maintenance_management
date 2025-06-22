
import React, { useState } from 'react';
// import { Modal } from '../common/Modal';
import { Button } from '../ui/Button';
//import { MaintenanceRecord, ApprovalStatus, MaintenanceResultStatus } from '../../types';
//import { APPROVAL_STATUS_COLORS, MAINTENANCE_RESULT_COLORS } from '../../constants';
import { ApprovalStatus, getStatusBadgeClassName, getMaintenanceResultClassName } from '../../constants/maintenance'
import { CheckCircleIcon, XCircleIcon, UserCircleIcon, CalendarDaysIcon } from "../ui/icons"
import { format } from 'date-fns'

//const formatDate = (dateString) => new Date(dateString).toLocaleString();

export const MaintenanceRecordView = ({ 
  record, onApprove, onReject, onClose, isLoading 
}) => {
  const [adminRemarks, setAdminRemarks] = useState('');

  if (!record) return null;

  const handleApprove = () => {
    onApprove(record.id, adminRemarks);
    setAdminRemarks('');
  };

  const handleReject = () => {
    if (!adminRemarks.trim()) {
        alert("Admin remarks are required for rejection.");
        return;
    }
    onReject(record.id, adminRemarks);
    setAdminRemarks('');
  };

  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Asset: {record.asset?.name || 'N/A'}</h3>
          {/*<p className="text-sm text-gray-600 flex items-center"><UserCircleIcon className="h-4 w-4 mr-1.5 text-gray-400" /> Submitted by: {record.submittedBy || 'N/A'}</p>*/}
          <p className="text-sm text-gray-600 flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-1.5 text-gray-400" /> Submitted on: {format(record.maintenanceDate, 'dd/MM/yyyy HH:mm')}</p>
          <p className="text-sm">
            Status: <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadgeClassName(record.approvalStatus)}`}>{record.approvalStatus}</span>
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-2">Checklist Results:</h4>
          {record.maintenanceResults.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 border rounded-md p-3 bg-gray-50">
              {record.maintenanceResults.map(result => (
                <li key={result.id} className="p-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-700">{result.checklistItemTask || `Item ID: ${result.checklistItemId}`}</p>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getMaintenanceResultClassName(result.result)}`}>
                      {result.result}
                    </span>
                  </div>
                  {result.comments && <p className="text-sm text-gray-500 mt-1 pl-1"><em>Comment:</em> {result.comments}</p>}
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-sm text-gray-500 italic">No checklist items reported for this maintenance.</p>
          )}
        </div>

        {record.approvalStatus === ApprovalStatus.PENDING && (
          <div>
            <label htmlFor="adminRemarks" className="block text-sm font-medium text-gray-700 mb-1">Admin Remarks</label>
            <textarea
              id="adminRemarks"
              value={adminRemarks}
              onChange={(e) => setAdminRemarks(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add optional remarks for approval, or required remarks for rejection..."
            />
          </div>
        )}

        {record.adminRemarks && record.approvalStatus !== ApprovalStatus.PENDING && (
             <div>
                <h4 className="text-md font-semibold text-gray-700 mb-1">Admin Remarks:</h4>
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">{record.adminRemarks}</p>
            </div>
        )}


        {record.approvalStatus === ApprovalStatus.PENDING && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="secondary" className = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400' onClick={onClose} disabled={isLoading}>Cancel</Button>
            <Button variant="secondary" className = 'bg-red-400 hover:bg-red-500 text-white focus:ring-red-500' onClick={handleReject} disabled={isLoading || !adminRemarks.trim()}>
                <XCircleIcon className="h-5 w-5 mr-1.5"/> Reject
            </Button>
            <Button variant="secondary" className = 'bg-blue-400 hover:bg-blue-500 text-white focus:ring-blue-500' onClick={handleApprove} disabled={isLoading}>
                <CheckCircleIcon className="h-5 w-5 mr-1.5"/> Approve
            </Button>
          </div>
        )}
         {record.approvalStatus !== ApprovalStatus.PENDING && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
                 <Button variant="secondary" className = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400' onClick={onClose}>Close</Button>
            </div>
         )}
      </div>
  );
};
    