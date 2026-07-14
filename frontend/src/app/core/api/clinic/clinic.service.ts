import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../shared/api.types';
import { ClinicDto, WorkingHoursDisplay } from './clinic.types';
import { DAY_LABELS } from '../../layout/layout.types';

@Injectable({ providedIn: 'root' })
export class ClinicService {
    private http = inject(HttpClient);
    private base = '/api/clinic';

    getInfo(): Observable<ClinicDto> {
        return this.http.get<ApiResponse<ClinicDto>>(this.base)
            .pipe(map((res) => res.data!));
    }

    updateInfo(data: Partial<ClinicDto>): Observable<ClinicDto> {
        return this.http.put<ApiResponse<ClinicDto>>(this.base, data)
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
