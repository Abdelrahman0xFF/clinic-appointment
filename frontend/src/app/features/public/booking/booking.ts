import { Component, inject, signal } from '@angular/core';
import { ClinicApi } from '../../../core/api/clinic/clinic.service';
import { AppointmentApi } from '../../../core/api/appointment/appointment.service';
import { AppointmentDto, TimeSlot } from '../../../core/api/appointment/appointment.types';
import { BookingStepper } from './sections/stepper';
import { BookingStepDateTime } from './sections/step-date-time';
import { BookingStepDetails } from './sections/step-details';
import { BookingStepPayment } from './sections/step-payment';
import { BookingStepReview } from './sections/step-review';
import { BookingStepSuccess } from './sections/step-success';

@Component({
    selector: 'app-booking',
    imports: [
        BookingStepper,
        BookingStepDateTime,
        BookingStepDetails,
        BookingStepPayment,
        BookingStepReview,
        BookingStepSuccess,
    ],
    template: `
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            @if (step() < 5) {
                <app-booking-stepper [current]="step()" />
            }

            @if (step() === 1) {
                <app-booking-step-date-time
                    [selectedDate]="selectedDate"
                    [selectedTime]="selectedTime"
                    [timeSlots]="timeSlots()"
                    [todayStr]="todayStr"
                    (dateChange)="onDateChange($event)"
                    (selectTime)="selectedTime = $event"
                    (next)="step.set(2)"
                />
            }

            @if (step() === 2) {
                <app-booking-step-details
                    [fullName]="fullName"
                    [phone]="phone"
                    [reason]="reason"
                    (fullNameChange)="fullName = $event"
                    (phoneChange)="phone = $event"
                    (reasonChange)="reason = $event"
                    (next)="step.set(3)"
                    (back)="step.set(1)"
                />
            }

            @if (step() === 3) {
                <app-booking-step-payment
                    [instapayLink]="clinicData?.instapayLink ?? ''"
                    [walletNumber]="clinicData?.walletNumber ?? ''"
                    [consultationFee]="clinicData?.consultationFee ?? 0"
                    [receiptFileName]="receiptFile?.name ?? null"
                    [receiptFileSizeKB]="receiptFile ? +(receiptFile.size / 1024).toFixed(1) : 0"
                    (fileSelected)="onFileSelected($event)"
                    (removeReceipt)="receiptFile = null"
                    (next)="step.set(4)"
                    (back)="step.set(2)"
                />
            }

            @if (step() === 4) {
                <app-booking-step-review
                    [selectedDate]="selectedDate"
                    [selectedTime]="selectedTime"
                    [fullName]="fullName"
                    [phone]="phone"
                    [reason]="reason"
                    [hasReceipt]="!!receiptFile"
                    [submitting]="submitting()"
                    (confirm)="submitBooking()"
                    (back)="onBackFromReview()"
                />
            }

            @if (step() === 5) {
                <app-booking-step-success
                    [appointment]="confirmedAppointment"
                    [address]="clinicData?.address ?? ''"
                />
            }
        </div>
    `,
})
export class Booking {
    private clinicApi = inject(ClinicApi);
    private appointmentApi = inject(AppointmentApi);

    step = signal(1);
    submitting = signal(false);

    selectedDate = '';
    selectedTime = '';
    fullName = '';
    phone = '';
    reason = '';
    receiptFile: File | null = null;
    confirmedAppointment: AppointmentDto | null = null;

    timeSlots = signal<TimeSlot[]>([]);

    get clinicData() {
        return this.clinicApi.clinicData();
    }

    get todayStr() {
        return new Date().toISOString().split('T')[0];
    }

    onDateChange(date: string) {
        this.selectedDate = date;
        this.selectedTime = '';
        if (date) {
            this.appointmentApi.getSlots(date).subscribe({
                next: (slots) =>
                    this.timeSlots.set(slots.map((t) => ({ time: t, available: true }))),
                error: () => this.timeSlots.set([]),
            });
        } else {
            this.timeSlots.set([]);
        }
    }

    onFileSelected(file: File) {
        this.receiptFile = file;
    }

    onBackFromReview() {
        this.submitting.set(false);
        this.step.set(3);
    }

    submitBooking() {
        if (this.submitting()) return;
        this.submitting.set(true);

        const formData = new FormData();
        formData.append('fullName', this.fullName);
        formData.append('phone', this.phone);
        if (this.reason) {
            formData.append('reason', this.reason);
        }
        formData.append('date', this.selectedDate);
        formData.append('time', this.selectedTime);
        if (this.receiptFile) {
            formData.append('receiptFile', this.receiptFile);
        }

        this.appointmentApi.create(formData).subscribe({
            next: (res) => {
                this.confirmedAppointment = res.data ?? null;
                this.submitting.set(false);
                this.step.set(5);
            },
            error: () => {
                this.submitting.set(false);
            },
        });
    }
}
