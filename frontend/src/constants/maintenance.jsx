

export const ApprovalStatus = Object.freeze({
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED"
});

export const MaintenanceResult = Object.freeze({
    OK: "OK",
    NOT_OK: "NOT_OK"
})

export const getMaintenanceResultClassName = (result) => {
  switch (result) {
    case MaintenanceResult.OK: return 'bg-green-100 text-green-800';
    case MaintenanceResult.NOT_OK: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusBadgeClassName = (status) => {
    switch (status) {
        case ApprovalStatus.APPROVED: return 'bg-green-100 text-green-800';
        case ApprovalStatus.REJECTED: return 'bg-red-100 text-red-800';
        case ApprovalStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800' 
    }
}