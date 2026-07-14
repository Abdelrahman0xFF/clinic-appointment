export interface AdminDto {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface CreateAdminRequest {
    username: string;
    password: string;
}

export interface DashboardStats {
    pendingRequests: number;
    todayAppointments: number;
    activeQueue: number;
    completedToday: number;
}
