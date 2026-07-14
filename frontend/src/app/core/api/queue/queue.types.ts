export interface QueueEntryDto {
    id: string;
    appointmentId: {
        id: string;
        time: string;
        patientId: { id: string; fullName: string };
    };
    time: string;
    stage: 'waiting' | 'in_consultation' | 'completed';
    createdAt: string;
    updatedAt: string;
}
