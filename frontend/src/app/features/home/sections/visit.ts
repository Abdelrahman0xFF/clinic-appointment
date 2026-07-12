import { Component, inject } from '@angular/core';
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
        <app-section id="visit" title="Visit Our Clinic">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="p-6 lg:p-8 rounded-xl border border-slate-200 bg-white">
                    <h3 class="text-xl font-bold text-slate-900 mb-6">Clinic Information</h3>

                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <ng-icon
                                name="heroMapPin"
                                size="20"
                                color="#2563eb"
                                class="shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">Address</p>
                                <p class="text-slate-600">
                                    {{ address }}
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <ng-icon
                                name="heroClock"
                                size="20"
                                color="#2563eb"
                                class="shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="font-semibold text-slate-900 mb-2">Working Hours</p>
                                <ul class="text-slate-600 space-y-1 text-sm"></ul>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <ng-icon
                                name="heroPhone"
                                size="20"
                                color="#2563eb"
                                class="shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">Phone</p>
                                <a
                                    href="tel:{{ phone }}"
                                    class="text-blue-600 hover:text-blue-700 transition"
                                >
                                    {{ phone }}
                                </a>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <ng-icon
                                name="heroChatBubbleLeftEllipsis"
                                size="20"
                                color="#059669"
                                class="shrink-0 mt-0.5"
                            />
                            <div>
                                <p class="font-semibold text-slate-900 mb-1">WhatsApp</p>
                                <a
                                    href="https://wa.me/{{ phone }}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-emerald-600 hover:text-emerald-700 transition"
                                >
                                    Chat with us
                                </a>
                            </div>
                        </div>
                    </div>

                    <a routerLink="/booking" class="block mt-8">
                        <app-button class="w-full">Book an Appointment</app-button>
                    </a>
                </div>

                <div
                    class="bg-slate-200 rounded-2xl h-96 lg:h-auto flex items-center justify-center border border-slate-200"
                >
                    <div class="text-center">
                        <ng-icon
                            name="heroMapPin"
                            size="48"
                            color="#94a3b8"
                            class="mx-auto mb-3 block"
                        />
                        <p class="text-slate-500 font-medium mb-3">Map Placeholder</p>
                        <a
                            href="https://maps.google.com/?q={{ address }}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex"
                        >
                            <app-button variant="outline" size="sm">Open in Maps</app-button>
                        </a>
                    </div>
                </div>
            </div>
        </app-section>
    `,
})
export class Visit {
    private clinic = inject(ClinicService);
    address = this.clinic.address;
    phone = this.clinic.phone;
}
