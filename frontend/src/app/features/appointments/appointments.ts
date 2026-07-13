import { Component, inject } from '@angular/core';
import { ClinicService } from '../../core/clinic';
import { AppointmentsToolbar } from './sections/toolbar';
import { AppointmentsTable } from './sections/table';

@Component({
    selector: 'app-appointments',
    imports: [AppointmentsToolbar, AppointmentsTable],
    template: `
        <div>
            <app-appointments-toolbar
                [filterTabs]="filterTabs"
                [selectedFilter]="selectedFilter"
                (filterChange)="selectedFilter = $event"
            />

            <app-appointments-table
                [appointments]="filteredAppointments"
                [showReceiptFor]="showReceiptFor"
                [selectedFilter]="selectedFilter"
                (toggleReceipt)="showReceiptFor = showReceiptFor === $event ? null : $event"
            />
        </div>
    `,
})
export class Appointments {
    private clinic = inject(ClinicService);

    appointments = this.clinic.appointments;

    selectedFilter = 'all';
    showReceiptFor: number | null = null;

    get pendingCount() {
        return this.appointments.filter((a) => a.status === 'pending').length;
    }

    get approvedCount() {
        return this.appointments.filter((a) => a.status === 'approved').length;
    }

    get rejectedCount() {
        return this.appointments.filter((a) => a.status === 'rejected').length;
    }

    get filterTabs() {
        return [
            { key: 'all', label: 'All', count: this.appointments.length },
            { key: 'pending', label: 'Pending', count: this.pendingCount },
            { key: 'approved', label: 'Approved', count: this.approvedCount },
            { key: 'rejected', label: 'Rejected', count: this.rejectedCount },
        ];
    }

    get filteredAppointments() {
        if (this.selectedFilter === 'all') return this.appointments;
        return this.appointments.filter((a) => a.status === this.selectedFilter);
    }
}
