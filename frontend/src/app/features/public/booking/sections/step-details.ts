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
                        maxlength="100"
                        [class]="'w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 outline-none transition-all ' + ((showErrors && (!fullName || fullName.length < 3)) ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100')"
                    />
                    @if (showErrors && !fullName) {
                        <p class="text-xs text-red-500 mt-1.5">Full name is required</p>
                    } @else if (showErrors && fullName.length < 3) {
                        <p class="text-xs text-red-500 mt-1.5">Full name must be at least 3 characters</p>
                    }
                </div>
                <div>
                    <label
                        for="booking-phone"
                        class="block text-sm font-semibold text-slate-900 mb-2"
                        >Phone Number *</label
                    >
                    <div
                        [class]="'flex items-center rounded-lg border bg-white overflow-hidden transition-all focus-within:ring-2 ' + ((showErrors && !phone) ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100' : (showErrors && !isValidPhone ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100' : 'border-slate-200 focus-within:border-blue-400 focus-within:ring-blue-100'))"
                    >
                        <div
                            class="flex items-center justify-center px-3.5 py-2.5 bg-slate-50 border-r border-slate-200 text-slate-600 font-mono text-sm font-semibold select-none"
                        >
                            <span>+20</span>
                        </div>
                        <input
                            id="booking-phone"
                            type="tel"
                            [value]="restPhone"
                            (input)="onPhoneInput($any($event.target).value)"
                            placeholder="1123123123"
                            maxlength="11"
                            class="w-full px-3.5 py-2.5 bg-transparent text-sm text-slate-900 font-mono placeholder:text-slate-400 outline-none"
                        />
                    </div>
                    @if (showErrors && !phone) {
                        <p class="text-xs text-red-500 mt-1.5">Phone number is required</p>
                    } @else if (showErrors && !isValidPhone) {
                        <p class="text-xs text-red-500 mt-1.5">Enter a valid mobile number (e.g. 10xxxxxxxx, 11xxxxxxxx, 12xxxxxxxx, 15xxxxxxxx)</p>
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
                        maxlength="500"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    ></textarea>
                    <p class="text-xs text-slate-400 mt-1 text-right">{{ reason.length }}/500</p>
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

    get restPhone(): string {
        if (!this.phone) return '';
        let num = this.phone.replace(/^\+?20/, '');
        if (num.startsWith('0')) num = num.substring(1);
        return num;
    }

    onPhoneInput(value: string) {
        this.showErrors = false;
        let digits = value.replace(/\D/g, '');
        if (digits.startsWith('20')) {
            digits = digits.substring(2);
        }
        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }
        digits = digits.slice(0, 10);
        const fullPhone = digits ? `+20${digits}` : '';
        this.phoneChange.emit(fullPhone);
    }

    get isValidPhone(): boolean {
        return /^\+?201[0125][0-9]{8}$/.test(this.phone);
    }

    onNext() {
        if (this.fullName && this.fullName.length >= 3 && this.phone && this.isValidPhone) {
            this.next.emit();
        } else {
            this.showErrors = true;
        }
    }
}
