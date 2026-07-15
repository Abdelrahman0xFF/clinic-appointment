export interface QueueCardItem {
    id: string;
    patientName: string;
    time: string;
}

export interface CheckInCandidate {
    id: string;
    patientName: string;
    time: string;
    phone: string;
    reason?: string;
}
