export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    smsStatus?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
