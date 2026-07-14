import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UiButton } from '../../../../shared/ui/button';

@Component({
    selector: 'app-booking-step-details',
    imports: [UiButton],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Your Details</h2>

            <div class="space-y-4 mb-6">
                <div>
                    <label
                        for="booking-name"
                        class="block text-sm font-semibold text-slate-900 mb-2"
                        >Full Name *</label
                    >
                    <input
                        id="booking-name"
                        type="text"
                        [value]="fullName"
                        (input)="fullNameChange.emit($any($event.target).value); showErrors = false"
                        placeholder="Ahmed Hassan"
                        [class]="'w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 outline-none transition-all ' + (showErrors && !fullName ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100')"
                    />
                    @if (showErrors && !fullName) {
                        <p class="text-xs text-red-500 mt-1.5">Full name is required</p>
                    }
                </div>
                <div>
                    <label
                        for="booking-phone"
                        class="block text-sm font-semibold text-slate-900 mb-2"
                        >Phone Number *</label
                    >
                    <input
                        id="booking-phone"
                        type="tel"
                        [value]="phone"
                        (input)="phoneChange.emit($any($event.target).value); showErrors = false"
                        placeholder="01012345678"
                        [class]="'w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-900 font-mono placeholder:text-slate-400 focus:ring-2 outline-none transition-all ' + (showErrors && !phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100')"
                    />
                    @if (showErrors && !phone) {
                        <p class="text-xs text-red-500 mt-1.5">Phone number is required</p>
                    }
                </div>
                <div>
                    <label
                        for="booking-reason"
                        class="block text-sm font-semibold text-slate-900 mb-2"
                        >Reason for Visit (Optional)</label
                    >
                    <textarea
                        id="booking-reason"
                        [value]="reason"
                        (input)="reasonChange.emit($any($event.target).value)"
                        placeholder="Describe your symptoms or reason for consultation..."
                        rows="4"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    ></textarea>
                </div>
            </div>

            <div class="flex gap-3">
                <app-button variant="outline" (click)="back.emit()" class="w-full">Back</app-button>
                <app-button (click)="onNext()" class="w-full">Next</app-button>
            </div>
        </div>
    `,
})
export class BookingStepDetails {
    @Input() fullName = '';
    @Input() phone = '';
    @Input() reason = '';
    @Output() fullNameChange = new EventEmitter<string>();
    @Output() phoneChange = new EventEmitter<string>();
    @Output() reasonChange = new EventEmitter<string>();
    @Output() next = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();

    showErrors = false;

    onNext() {
        if (this.fullName && this.phone) {
            this.next.emit();
        } else {
            this.showErrors = true;
        }
    }
}
