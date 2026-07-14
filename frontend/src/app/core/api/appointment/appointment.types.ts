export interface AppointmentDto {
    id: string;
    patientId: string;
    reason: string;
    date: string;
    time: string;
    status: 'pending' | 'approved' | 'rejected';
    receiptImageUrl: string;
    checkedIn: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}
