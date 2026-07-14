import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentEye,
    fluentCheckmark,
    fluentDismiss,
    fluentCalendarClock,
    fluentSearch,
    fluentPerson,
    fluentPhone,
    fluentDocumentText,
    fluentMoney,
} from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [
        provideIcons({
            fluentEye,
            fluentCheckmark,
            fluentDismiss,
            fluentCalendarClock,
            fluentSearch,
            fluentPerson,
            fluentPhone,
            fluentDocumentText,
            fluentMoney,
        }),
    ],
    selector: 'app-appointments-table',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50/50">
                            <th
                                class="px-6 py-3.5 text-left font-semibold text-slate-900 text-xs uppercase tracking-wider"
                            >
                                Patient
                            </th>
                            <th
                                class="px-6 py-3.5 text-left font-semibold text-slate-900 text-xs uppercase tracking-wider"
                            >
                                Date & Time
                            </th>
                            <th
                                class="px-6 py-3.5 text-left font-semibold text-slate-900 text-xs uppercase tracking-wider hidden md:table-cell"
                            >
                                Phone
                            </th>
                            <th
                                class="px-6 py-3.5 text-left font-semibold text-slate-900 text-xs uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                class="px-6 py-3.5 text-right font-semibold text-slate-900 text-xs uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @if (appointments.length > 0) {
                            @for (apt of appointments; track apt.id) {
                                <tr class="transition-colors hover:bg-slate-50">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0"
                                            >
                                                <span class="text-slate-600 font-semibold text-sm">
                                                    {{ apt.patientName.charAt(0) }}
                                                </span>
                                            </div>
                                            <div>
                                                <p class="font-medium text-slate-900">
                                                    {{ apt.patientName }}
                                                </p>
                                                @if (apt.reason) {
                                                    <p
                                                        class="text-xs text-slate-500 mt-0.5 line-clamp-1"
                                                    >
                                                        {{ apt.reason }}
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center gap-2">
                                            <ng-icon
                                                name="fluentCalendarClock"
                                                size="16"
                                                class="text-slate-400 shrink-0"
                                            />
                                            <span class="text-slate-700">
                                                {{ apt.date }}
                                                <span class="text-slate-400">at</span>
                                                {{ apt.time }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                        <span class="text-slate-600 font-mono text-sm">
                                            {{ apt.phone }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span [class]="statusBadgeClass(apt.status)">
                                            {{
                                                apt.status.charAt(0).toUpperCase() +
                                                    apt.status.slice(1)
                                            }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right">
                                        <div class="flex items-center justify-end gap-1.5">
                                            <button
                                                type="button"
                                                (click)="toggleReceipt.emit(apt.id)"
                                                class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
                                            >
                                                <ng-icon name="fluentEye" size="16" />
                                                <span class="hidden sm:inline">View</span>
                                            </button>

                                            @if (apt.status === 'pending') {
                                                <button
                                                    type="button"
                                                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                                                >
                                                    <ng-icon name="fluentCheckmark" size="16" />
                                                    <span class="hidden sm:inline">Approve</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
                                                >
                                                    <ng-icon name="fluentDismiss" size="16" />
                                                    <span class="hidden sm:inline">Reject</span>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                </tr>

                                @if (showReceiptFor === apt.id) {
                                    <tr class="bg-slate-50/50">
                                        <td colspan="5" class="px-6 py-5">
                                            <div
                                                class="rounded-xl border border-slate-200 bg-white p-5"
                                            >
                                                <div
                                                    class="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100"
                                                >
                                                    <ng-icon
                                                        name="fluentDocumentText"
                                                        size="20"
                                                        class="text-blue-600"
                                                    />
                                                    <h3
                                                        class="font-semibold text-slate-900 text-sm"
                                                    >
                                                        Payment Receipt
                                                    </h3>
                                                </div>

                                                <div
                                                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                                                >
                                                    <div>
                                                        <p
                                                            class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                                                        >
                                                            <ng-icon
                                                                name="fluentPerson"
                                                                size="12"
                                                            />
                                                            Patient
                                                        </p>
                                                        <p
                                                            class="text-sm font-medium text-slate-900"
                                                        >
                                                            {{ apt.patientName }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                                                        >
                                                            <ng-icon name="fluentPhone" size="12" />
                                                            Phone
                                                        </p>
                                                        <p class="text-sm text-slate-700">
                                                            {{ apt.phone }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                                                        >
                                                            <ng-icon
                                                                name="fluentCalendarClock"
                                                                size="12"
                                                            />
                                                            Appointment
                                                        </p>
                                                        <p class="text-sm text-slate-700">
                                                            {{ apt.date }} at {{ apt.time }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                                                        >
                                                            <ng-icon name="fluentMoney" size="12" />
                                                            Amount
                                                        </p>
                                                        <p
                                                            class="text-sm font-medium text-slate-900"
                                                        >
                                                            300 EGP
                                                        </p>
                                                    </div>
                                                </div>

                                                @if (apt.reason) {
                                                    <div
                                                        class="mt-4 pt-3 border-t border-slate-100"
                                                    >
                                                        <p class="text-xs text-slate-400 mb-1">
                                                            Reason
                                                        </p>
                                                        <p class="text-sm text-slate-700">
                                                            {{ apt.reason }}
                                                        </p>
                                                    </div>
                                                }

                                                <div class="mt-4 pt-3 border-t border-slate-100">
                                                    <div
                                                        class="bg-slate-100 rounded-lg h-32 flex items-center justify-center border border-dashed border-slate-300"
                                                    >
                                                        <div class="text-center">
                                                            <ng-icon
                                                                name="fluentSearch"
                                                                size="24"
                                                                class="text-slate-400 mx-auto mb-1 block"
                                                            />
                                                            <p class="text-sm text-slate-500">
                                                                Receipt Screenshot Placeholder
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                }
                            }
                        } @else {
                            <tr>
                                <td colspan="5" class="px-6 py-16 text-center">
                                    <div
                                        class="size-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4"
                                    >
                                        <ng-icon
                                            name="fluentCalendarClock"
                                            size="24"
                                            class="text-slate-400"
                                        />
                                    </div>
                                    <p class="text-slate-500 font-medium">
                                        No {{ selectedFilter === 'all' ? '' : selectedFilter }}
                                        appointments found
                                    </p>
                                    <p class="text-slate-400 text-sm mt-1">
                                        {{
                                            selectedFilter === 'all'
                                                ? 'Appointments will appear here when patients book.'
                                                : 'No appointments match this filter.'
                                        }}
                                    </p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `,
})
export class AppointmentsTable {
    @Input() appointments: {
        id: number;
        patientName: string;
        date: string;
        time: string;
        phone: string;
        status: string;
        reason?: string;
    }[] = [];
    @Input() showReceiptFor: number | null = null;
    @Input() selectedFilter = 'all';
    @Output() toggleReceipt = new EventEmitter<number>();

    statusBadgeClass(status: string): string {
        const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
        switch (status) {
            case 'pending':
                return `${base} bg-amber-100 text-amber-700`;
            case 'approved':
                return `${base} bg-blue-100 text-blue-700`;
            case 'rejected':
                return `${base} bg-rose-100 text-rose-700`;
            default:
                return `${base} bg-slate-100 text-slate-700`;
        }
    }
}
