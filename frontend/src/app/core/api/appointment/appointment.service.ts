import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { ApiResponse } from '../shared/api.types';
import { AppointmentDto } from './appointment.types';

@Injectable({ providedIn: 'root' })
export class AppointmentApi {
    private http = inject(HttpClient);
    private base = '/api/appointment';

    getSlots(date: string): Observable<string[]> {
        return this.http
            .get<ApiResponse<string[]>>(`${this.base}/slots`, { params: { date } })
            .pipe(map((res) => res.data!));
    }

    create(formData: FormData): Observable<ApiResponse<AppointmentDto>> {
        return this.http
            .post<ApiResponse<AppointmentDto>>(this.base, formData)
            .pipe(timeout(30000));
    }

    getPatientAppointments(phone: string, fullName: string): Observable<AppointmentDto[]> {
        return this.http
            .get<ApiResponse<AppointmentDto[]>>(`${this.base}/${phone}/${fullName}`)
            .pipe(map((res) => res.data!));
    }

    reschedule(
        id: string,
        data: { date: string; time: string; phone: string; fullName: string },
    ): Observable<ApiResponse<AppointmentDto>> {
        return this.http.put<ApiResponse<AppointmentDto>>(`${this.base}/${id}/reschedule`, data);
    }
}
