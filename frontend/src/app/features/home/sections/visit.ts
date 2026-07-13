import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../../shared/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    heroMapPin,
    heroClock,
    heroPhone,
    heroChatBubbleLeftEllipsis,
} from '@ng-icons/heroicons/outline';
import { ClinicService } from '../../../core/clinic';
import { Section } from '../../../shared/section';

@Component({
    viewProviders: [provideIcons({ heroMapPin, heroClock, heroPhone, heroChatBubbleLeftEllipsis })],
    selector: 'app-visit',
    imports: [UiButton, NgIcon, RouterLink, Section],
    template: `
        <app-section id="visit" title="Visit Our Clinic" [class]="class">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div
                    class="lg:col-span-3 p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                    <h3 class="text-xl font-bold text-slate-900 mb-7">Clinic Information</h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="flex gap-4 sm:col-span-2">
                            <span
                                class="size-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="heroMapPin" size="22" color="#2563eb" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">Address</p>
                                <p class="text-slate-600 text-sm leading-relaxed">
                                    {{ address }}
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-4 sm:col-span-2">
                            <span
                                class="size-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon
                                    name="heroChatBubbleLeftEllipsis"
                                    size="22"
                                    color="#2563eb"
                                />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">WhatsApp</p>
                                <a
                                    href="https://wa.me/{{ phone }}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-blue-600 hover:text-blue-700 font-medium transition"
                                >
                                    Chat with us on WhatsApp
                                </a>
                                <p class="text-xs text-slate-400 mt-0.5">
                                    Quick responses during working hours
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <span
                                class="size-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="heroPhone" size="22" color="#2563eb" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">Phone</p>
                                <a
                                    href="tel:{{ phone }}"
                                    class="text-blue-600 hover:text-blue-700 font-medium transition"
                                >
                                    {{ phone }}
                                </a>
                                <p class="text-xs text-slate-400 mt-0.5">Call us to book</p>
                            </div>
                        </div>
                    </div>

                    <a routerLink="/booking" class="block mt-8">
                        <app-button class="w-full justify-center shadow-md shadow-blue-200">
                            Book an Appointment
                        </app-button>
                    </a>
                </div>

                <div
                    class="lg:col-span-2 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200 h-80 lg:h-auto"
                >
                    <div class="text-center p-6">
                        <div
                            class="size-16 mx-auto rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-4"
                        >
                            <ng-icon name="heroMapPin" size="32" color="#94a3b8" />
                        </div>
                        <p class="text-slate-500 font-medium mb-1">Map Location</p>
                        <p class="text-xs text-slate-400 mb-5 max-w-xs mx-auto">
                            {{ address }}
                        </p>
                        <a
                            href="https://maps.google.com/?q={{ address }}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <app-button variant="ghost" size="sm">
                                <ng-icon name="heroMapPin" size="16" class="mr-1.5" />
                                Open in Google Maps
                            </app-button>
                        </a>
                    </div>
                </div>
            </div>
        </app-section>
    `,
})
export class Visit {
    @Input() class = '';
    private clinic = inject(ClinicService);
    address = this.clinic.address;
    phone = this.clinic.phone;
}
