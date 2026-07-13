import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimeSlot } from '../../../core/clinic';
import { UiButton } from '../../../shared/ui/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-booking-step-date-time',
    imports: [UiButton, RouterLink],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Select Date & Time</h2>

            <div class="mb-8">
                <label for="booking-date" class="block text-sm font-semibold text-slate-900 mb-3"
                    >Preferred Date</label
                >
                <input
                    id="booking-date"
                    type="date"
                    [value]="selectedDate"
                    (change)="onDateChange($event)"
                    [min]="todayStr"
                    [class]="
                        'w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-900 focus:ring-2 outline-none transition-all ' +
                        (showErrors && !selectedDate
                            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                            : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100')
                    "
                />
                @if (showErrors && !selectedDate) {
                    <p class="text-xs text-red-500 mt-1.5">Please select a date</p>
                }
                <p class="text-xs text-slate-500 mt-2">
                    Note: {{ fullyBookedLabel }} is fully booked
                </p>
            </div>

            @if (selectedDate) {
                <div>
                    <span class="block text-sm font-semibold text-slate-900 mb-3"
                        >Available Times</span
                    >
                    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
                        @for (slot of timeSlots; track slot.time) {
                            <button
                                type="button"
                                (click)="slot.available && selectTime.emit(slot.time)"
                                [disabled]="!slot.available"
                                [class]="
                                    'py-2 px-3 rounded-lg font-medium text-sm transition cursor-pointer ' +
                                    (selectedTime === slot.time
                                        ? 'bg-blue-600 text-white'
                                        : slot.available
                                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                          : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50')
                                "
                            >
                                {{ slot.time }}
                            </button>
                        }
                    </div>
                    @if (showErrors && !selectedTime) {
                        <p class="text-xs text-red-500 -mt-4 mb-6">Please select a time slot</p>
                    }
                </div>
            }

            <div class="flex gap-3 pt-2">
                <a routerLink="/" class="w-full">
                    <app-button variant="outline" class="w-full">Cancel</app-button>
                </a>
                <app-button (click)="onNext()" class="w-full">Next</app-button>
            </div>
        </div>
    `,
})
export class BookingStepDateTime {
    @Input() selectedDate = '';
    @Input() selectedTime = '';
    @Input() timeSlots: TimeSlot[] = [];
    @Input() todayStr = '';
    @Input() fullyBookedLabel = '';
    @Output() dateChange = new EventEmitter<string>();
    @Output() selectTime = new EventEmitter<string>();
    @Output() next = new EventEmitter<void>();

    showErrors = false;

    onDateChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.showErrors = false;
        this.dateChange.emit(input.value);
    }

    onNext() {
        if (this.selectedDate && this.selectedTime) {
            this.next.emit();
        } else {
            this.showErrors = true;
        }
    }
}
