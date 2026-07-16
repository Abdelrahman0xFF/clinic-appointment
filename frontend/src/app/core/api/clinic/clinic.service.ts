import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../shared/api.types';
import { ClinicDto, WorkingHoursDisplay } from './clinic.types';
import { DAY_LABELS } from '../../layout/layout.types';

@Injectable({ providedIn: 'root' })
export class ClinicApi {
    private http = inject(HttpClient);
    private base = '/api/clinic';

    clinicData = signal<ClinicDto | null>(null);

    fetchInfo(): Observable<ClinicDto> {
        return this.http.get<ApiResponse<ClinicDto>>(this.base).pipe(map((res) => res.data!));
    }

    getInfo(): void {
        this.http
            .get<ApiResponse<ClinicDto>>(this.base)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (data) => this.clinicData.set(data),
                error: (err) => console.error('Failed to load clinic info', err),
                complete: () => console.log('Clinic info loaded'),
            });
    }

    updateInfo(data: Omit<ClinicDto, 'id' | 'createdAt' | 'updatedAt'>): Observable<ClinicDto> {
        return this.http
            .put<ApiResponse<ClinicDto>>(this.base, data)
            .pipe(map((res) => res.data!));
    }

    toWorkingHoursList(workingHours: ClinicDto['workingHours']): WorkingHoursDisplay[] {
        return Object.entries(workingHours).map(([key, val]) => ({
            key,
            label: DAY_LABELS[key] || key,
            hours: val ? `${val.start} - ${val.end}` : null,
        }));
    }
}
