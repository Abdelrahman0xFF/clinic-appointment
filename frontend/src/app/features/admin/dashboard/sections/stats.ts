import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAlert,
    fluentCheckmarkCircle,
    fluentDocumentBulletList,
    fluentArrowTrending,
} from '@ng-icons/fluent-ui';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    viewProviders: [
        provideIcons({
            fluentAlert,
            fluentCheckmarkCircle,
            fluentDocumentBulletList,
            fluentArrowTrending,
        }),
    ],
    selector: 'app-dashboard-stats',
    imports: [NgIcon, ScrollAnimateDirective],
    template: `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div
                appScrollAnimate
                animateDirection="zoom"
                animateDelay="0ms"
                class="group relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-amber-200/40 hover:-translate-y-0.5"
            >
                <div
                    class="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                ></div>
                <div class="relative">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold text-amber-900 text-sm">Pending Requests</h3>
                        <span
                            class="flex items-center justify-center size-9 rounded-lg bg-amber-100 text-amber-600"
                        >
                            <ng-icon name="fluentAlert" size="20" />
                        </span>
                    </div>
                    <p class="text-3xl font-bold text-amber-600 mb-0.5">
                        {{ pendingCount }}
                    </p>
                    <p class="text-sm text-amber-700">Awaiting review</p>
                </div>
            </div>

            <div
                appScrollAnimate
                animateDirection="zoom"
                animateDelay="100ms"
                class="group relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/40 hover:-translate-y-0.5"
            >
                <div
                    class="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                ></div>
                <div class="relative">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold text-blue-900 text-sm">Today's Appointments</h3>
                        <span
                            class="flex items-center justify-center size-9 rounded-lg bg-blue-100 text-blue-600"
                        >
                            <ng-icon name="fluentCheckmarkCircle" size="20" />
                        </span>
                    </div>
                    <p class="text-3xl font-bold text-blue-600 mb-0.5">
                        {{ todayAppointments }}
                    </p>
                    <p class="text-sm text-blue-700">Approved and ready</p>
                </div>
            </div>

            <div
                appScrollAnimate
                animateDirection="zoom"
                animateDelay="300ms"
                class="group relative overflow-hidden rounded-xl border border-purple-200 bg-purple-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-purple-200/40 hover:-translate-y-0.5"
            >
                <div
                    class="absolute top-0 right-0 w-24 h-24 bg-purple-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                ></div>
                <div class="relative">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold text-purple-900 text-sm">In Queue Now</h3>
                        <span
                            class="flex items-center justify-center size-9 rounded-lg bg-purple-100 text-purple-600"
                        >
                            <ng-icon name="fluentDocumentBulletList" size="20" />
                        </span>
                    </div>
                    <p class="text-3xl font-bold text-purple-600 mb-0.5">
                        {{ inQueueCount }}
                    </p>
                    <p class="text-sm text-purple-700">Active queue entries</p>
                </div>
            </div>

            <div
                appScrollAnimate
                animateDirection="zoom"
                animateDelay="200ms"
                class="group relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200/40 hover:-translate-y-0.5"
            >
                <div
                    class="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                ></div>
                <div class="relative">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-semibold text-emerald-900 text-sm">Completed Today</h3>
                        <span
                            class="flex items-center justify-center size-9 rounded-lg bg-emerald-100 text-emerald-600"
                        >
                            <ng-icon name="fluentArrowTrending" size="20" />
                        </span>
                    </div>
                    <p class="text-3xl font-bold text-emerald-600 mb-0.5">
                        {{ completedToday }}
                    </p>
                    <p class="text-sm text-emerald-700">Patient consultations</p>
                </div>
            </div>
        </div>
    `,
})
export class DashboardStats {
    @Input() pendingCount = 0;
    @Input() todayAppointments = 0;
    @Input() inQueueCount = 0;
    @Input() completedToday = 0;
}
