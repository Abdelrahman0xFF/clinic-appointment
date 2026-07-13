import { Component, inject } from '@angular/core';
import { ClinicService, TimeSlot } from '../../core/clinic';
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
            @if (step < 5) {
                <app-booking-stepper [current]="step" />
            }

            @if (step === 1) {
                <app-booking-step-date-time
                    [selectedDate]="selectedDate"
                    [selectedTime]="selectedTime"
                    [timeSlots]="timeSlots"
                    [todayStr]="todayStr"
                    [fullyBookedLabel]="fullyBookedLabel"
                    (dateChange)="onDateChange($event)"
                    (selectTime)="selectedTime = $event"
                    (next)="step = 2"
                />
            }

            @if (step === 2) {
                <app-booking-step-details
                    [fullName]="fullName"
                    [phone]="phone"
                    [reason]="reason"
                    (fullNameChange)="fullName = $event"
                    (phoneChange)="phone = $event"
                    (reasonChange)="reason = $event"
                    (next)="step = 3"
                    (back)="step = 1"
                />
            }

            @if (step === 3) {
                <app-booking-step-payment
                    [instapayLink]="service.instapayLink"
                    [walletNumber]="service.walletNumber"
                    [consultationFee]="service.consultationFee"
                    [receiptFileName]="receiptFile?.name ?? null"
                    [receiptFileSizeKB]="receiptFile ? +(receiptFile.size / 1024).toFixed(1) : 0"
                    (fileSelected)="onFileSelected($event)"
                    (removeReceipt)="receiptFile = null"
                    (next)="step = 4"
                    (back)="step = 2"
                />
            }

            @if (step === 4) {
                <app-booking-step-review
                    [selectedDate]="selectedDate"
                    [selectedTime]="selectedTime"
                    [fullName]="fullName"
                    [phone]="phone"
                    [reason]="reason"
                    [hasReceipt]="!!receiptFile"
                    (confirm)="submitBooking()"
                    (back)="step = 3"
                />
            }

            @if (step === 5) {
                <app-booking-step-success
                    [selectedDate]="selectedDate"
                    [selectedTime]="selectedTime"
                    [referenceNumber]="referenceNumber"
                    [address]="service.address"
                />
            }
        </div>
    `,
})
export class Booking {
    private clinicService = inject(ClinicService);
    step = 1;
    selectedDate = '';
    selectedTime = '';
    fullName = '';
    phone = '';
    reason = '';
    receiptFile: File | null = null;
    referenceNumber = '';

    get service() {
        return this.clinicService;
    }

    get todayStr() {
        return new Date().toISOString().split('T')[0];
    }

    get fullyBookedDate() {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d;
    }

    get fullyBookedLabel() {
        return this.fullyBookedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    }

    get isFullyBooked() {
        return this.selectedDate === this.fullyBookedDate.toISOString().split('T')[0];
    }

    get timeSlots(): TimeSlot[] {
        const slots = [
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
        ];
        return slots.map((time) => ({
            time,
            available: this.isFullyBooked ? false : Math.random() > 0.3,
        }));
    }

    onDateChange(date: string) {
        this.selectedDate = date;
        this.selectedTime = '';
    }

    onFileSelected(file: File) {
        this.receiptFile = file;
    }

    submitBooking() {
        this.referenceNumber = Date.now().toString().slice(-8);
        this.clinicService.addAppointment({
            patientName: this.fullName,
            phone: this.phone,
            date: this.selectedDate,
            time: this.selectedTime,
            reason: this.reason,
            receiptImageUrl: this.receiptFile ? URL.createObjectURL(this.receiptFile) : undefined,
            status: 'pending',
        });
        this.step = 5;
    }
}
