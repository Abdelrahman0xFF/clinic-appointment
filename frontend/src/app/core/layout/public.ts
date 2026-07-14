import { Component, computed, inject, OnInit } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UiButton } from '../../shared/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    faBrandWhatsapp,
    faBrandFacebook,
    faBrandInstagram,
    faBrandTwitter,
    faBrandLinkedin,
} from '@ng-icons/font-awesome/brands';
import {
    heroMapPin,
    heroPhone,
    heroClock,
    heroLink,
    heroBuildingOffice,
} from '@ng-icons/heroicons/outline';
import { ClinicService } from '../api/clinic/clinic.service';
import { NavLink, SOCIAL_MEDIA_MAPPER } from './layout.types';
import { scrollToElement } from '../../utils/scroll';

@Component({
    viewProviders: [
        provideIcons({
            faBrandWhatsapp,
            faBrandFacebook,
            faBrandInstagram,
            faBrandTwitter,
            faBrandLinkedin,
            heroMapPin,
            heroPhone,
            heroClock,
            heroLink,
            heroBuildingOffice,
        }),
    ],
    selector: 'app-layout-public',
    imports: [NgIcon, UiButton, KeyValuePipe, RouterLink, RouterOutlet],
    template: `
        <div class="min-h-screen bg-slate-50 flex flex-col">
            <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex items-center justify-between">
                        <button
                            (click)="scrollTo('hero')"
                            class="flex items-center gap-2 cursor-pointer"
                        >
                            <div
                                class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
                            >
                                <span class="text-white font-bold text-lg">MC</span>
                            </div>
                            <span class="font-bold text-slate-900 hidden sm:inline">
                                MediCare Clinic
                            </span>
                        </button>

                        <nav class="hidden md:flex items-center gap-1">
                            @for (link of navLinks; track link.label) {
                                <a
                                    [routerLink]="link.href"
                                    [fragment]="link.fragment"
                                    class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg cursor-pointer transition"
                                >
                                    {{ link.label }}
                                </a>
                            }
                        </nav>

                        <div class="flex items-center gap-3">
                            <a routerLink="/booking" class="hidden sm:inline-flex">
                                <app-button> Book Appointment </app-button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main class="flex-1">
                <router-outlet />
            </main>

            <footer class="bg-slate-900 pt-16 pb-0">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
                        <div>
                            <div class="flex items-center gap-2 mb-4">
                                <div
                                    class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0"
                                >
                                    <span class="text-white font-bold text-sm">MC</span>
                                </div>
                                <span class="font-bold text-white text-lg">MediCare Clinic</span>
                            </div>
                            <p class="text-sm text-slate-400 leading-relaxed mb-6">
                                Providing quality healthcare services with compassion and
                                excellence. Your health and well-being are our top priority.
                            </p>
                            <div class="flex gap-2">
                                @for (item of socialMedia() | keyvalue; track item.key) {
                                    @if (item.value?.link) {
                                        <a
                                            [href]="item.value.link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition"
                                        >
                                            <span class="sr-only">{{ item.key }}</span>
                                            <ng-icon
                                                [name]="SOCIAL_MEDIA_MAPPER[item.key]"
                                                size="16"
                                            />
                                        </a>
                                    }
                                }
                            </div>
                            <a routerLink="/booking" class="block mt-6">
                                <app-button class="w-full justify-center"
                                    >Book Appointment</app-button
                                >
                            </a>
                        </div>

                        <div>
                            <h4
                                class="font-semibold text-white text-sm uppercase tracking-wider mb-5"
                            >
                                Quick Links
                            </h4>
                            <ul class="space-y-3 mb-8">
                                @for (link of navLinks; track link.label) {
                                    <li>
                                        <a
                                            [routerLink]="link.href"
                                            [fragment]="link.fragment"
                                            class="text-sm text-slate-400 hover:text-white transition flex items-center gap-2"
                                        >
                                            <span
                                                class="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0"
                                            ></span>
                                            {{ link.label }}
                                        </a>
                                    </li>
                                }
                            </ul>
                            <div
                                class="pt-6 border-t border-slate-800 space-y-3 text-sm text-slate-400"
                            >
                                <div class="flex items-center gap-2">
                                    <ng-icon
                                        name="heroMapPin"
                                        size="16"
                                        class="text-slate-500 shrink-0"
                                    />
                                    <span>{{ address() }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <ng-icon
                                        name="heroPhone"
                                        size="16"
                                        class="text-slate-500 shrink-0"
                                    />
                                    <a
                                        href="tel:{{ phone() }}"
                                        class="hover:text-white transition"
                                        >{{ phone() }}</a
                                    >
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4
                                class="font-semibold text-white text-sm uppercase tracking-wider mb-5"
                            >
                                Working Hours
                            </h4>
                            <ul class="space-y-2.5 text-sm">
                                @for (day of workingHoursList(); track day.label) {
                                    <li
                                        class="flex justify-between items-center pb-2.5 border-b border-slate-800 last:border-0"
                                    >
                                        <span class="text-slate-400">{{ day.label }}</span>
                                        @if (day.hours) {
                                            <span class="text-slate-300 font-medium">{{
                                                day.hours
                                            }}</span>
                                        } @else {
                                            <span
                                                class="text-xs text-slate-600 font-medium bg-slate-800 px-2 py-0.5 rounded"
                                                >Closed</span
                                            >
                                        }
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>

                    <div
                        class="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500"
                    >
                        <p>&copy; {{ currentYear }} MediCare Clinic. All rights reserved.</p>
                        <p>
                            Designed by
                            <a
                                href="https://abdelrahmanashraf.dev"
                                target="_blank"
                                class="text-slate-400 hover:text-white transition"
                                >3ATEF</a
                            >
                        </p>
                    </div>
                </div>
            </footer>

            <a
                href="https://wa.me/{{ phone() }}"
                target="_blank"
                rel="noopener noreferrer"
                class="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center justify-center text-white z-50"
                aria-label="Contact us on WhatsApp"
            >
                <ng-icon size="30" name="faBrandWhatsapp" />
            </a>
        </div>
    `,
})
export class LayoutPublic implements OnInit {
    private clinic = inject(ClinicService);

    readonly SOCIAL_MEDIA_MAPPER = SOCIAL_MEDIA_MAPPER;
    readonly navLinks: NavLink[] = [
        { href: '/', label: 'Home', fragment: 'hero' },
        { href: '/', label: 'About', fragment: 'about' },
        { href: '/', label: 'Services', fragment: 'services' },
        { href: '/', label: 'Blog', fragment: 'blog' },
        { href: '/', label: 'Visit', fragment: 'visit' },
        { href: '/admin/dashboard', label: 'Admin' },
    ];

    address = computed(() => this.clinic.clinicData()?.address ?? '');
    phone = computed(() => this.clinic.clinicData()?.phone ?? '');
    socialMedia = computed(() => this.clinic.clinicData()?.socialMedia ?? {});
    workingHoursList = computed(() => {
        const data = this.clinic.clinicData();
        return data ? this.clinic.toWorkingHoursList(data.workingHours) : [];
    });
    currentYear = new Date().getFullYear();
    scrollTo = scrollToElement;

    ngOnInit() {
        this.clinic.getInfo();
    }
}
