import { Component, inject } from '@angular/core';
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
import { ClinicService } from '../clinic';
import { scrollToElement } from '../../utils/scroll';

@Component({
    viewProviders: [
        provideIcons({
            faBrandWhatsapp,
            faBrandFacebook,
            faBrandInstagram,
            faBrandTwitter,
            faBrandLinkedin,
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
                                @if (link.fragment) {
                                    <button
                                        type="button"
                                        (click)="scrollTo(link.fragment)"
                                        class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg cursor-pointer transition"
                                    >
                                        {{ link.label }}
                                    </button>
                                } @else {
                                    <a
                                        [routerLink]="link.href"
                                        class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg cursor-pointer transition"
                                    >
                                        {{ link.label }}
                                    </a>
                                }
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
                        <div class="sm:col-span-2 lg:col-span-1">
                            <div class="flex items-center gap-2 mb-4">
                                <div
                                    class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0"
                                >
                                    <span class="text-white font-bold text-sm">MC</span>
                                </div>
                                <span class="font-bold text-white text-lg">MediCare Clinic</span>
                            </div>
                            <p class="text-sm text-slate-400 leading-relaxed mb-5">
                                Providing quality healthcare services with compassion and
                                excellence. Your health and well-being are our top priority.
                            </p>
                            <div class="flex gap-2">
                                @for (item of clinic.socialMedia | keyvalue; track item.key) {
                                    @if (item.value?.link) {
                                        <a
                                            [href]="item.value.link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition"
                                        >
                                            <span class="sr-only">{{ item.key }}</span>
                                            <ng-icon
                                                [name]="socialMediaMapper[item.key]"
                                                size="16"
                                            />
                                        </a>
                                    }
                                }
                            </div>
                        </div>

                        <div>
                            <h4
                                class="font-semibold text-white text-sm uppercase tracking-wider mb-5"
                            >
                                Quick Links
                            </h4>
                            <ul class="space-y-3">
                                @for (link of navLinks; track link.label) {
                                    <li>
                                        @if (link.fragment) {
                                            <button
                                                type="button"
                                                (click)="scrollTo(link.fragment)"
                                                class="text-sm text-slate-400 hover:text-primary transition flex items-center gap-2"
                                            >
                                                <span
                                                    class="w-1 h-1 rounded-full bg-slate-600 shrink-0"
                                                ></span>
                                                {{ link.label }}
                                            </button>
                                        } @else {
                                            <a
                                                [routerLink]="link.href"
                                                class="text-sm text-slate-400 hover:text-primary transition flex items-center gap-2"
                                            >
                                                <span
                                                    class="w-1 h-1 rounded-full bg-slate-600 shrink-0"
                                                ></span>
                                                {{ link.label }}
                                            </a>
                                        }
                                    </li>
                                }
                                <li>
                                    <a
                                        routerLink="/booking"
                                        class="text-sm text-slate-400 hover:text-blue-400 transition flex items-center gap-2"
                                    >
                                        <span
                                            class="w-1 h-1 rounded-full bg-slate-600 shrink-0"
                                        ></span>
                                        Book Appointment
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4
                                class="font-semibold text-white text-sm uppercase tracking-wider mb-5"
                            >
                                Contact
                            </h4>
                            <ul class="space-y-3 text-sm text-slate-400">
                                <li class="flex items-start gap-3">
                                    <svg
                                        class="w-4 h-4 mt-0.5 text-slate-500 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>{{ clinic.address }}</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg
                                        class="w-4 h-4 mt-0.5 text-slate-500 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <a
                                        href="tel:{{ clinic.phone }}"
                                        class="hover:text-white transition"
                                        >{{ clinic.phone }}</a
                                    >
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg
                                        class="w-4 h-4 mt-0.5 text-slate-500 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span
                                        >Mon-Fri: 9:00 AM - 5:00 PM<br />Sat: 10:00 AM - 2:00
                                        PM</span
                                    >
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4
                                class="font-semibold text-white text-sm uppercase tracking-wider mb-5"
                            >
                                Working Hours
                            </h4>
                            <ul class="space-y-2.5 text-sm">
                                @for (day of workingHoursList; track day.label) {
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
                href="https://wa.me/{{ clinic.phone }}"
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
export class LayoutPublic {
    clinic = inject(ClinicService);
    navLinks = [
        { href: '/', label: 'Home', fragment: 'hero' },
        { href: '/', label: 'About', fragment: 'about' },
        { href: '/', label: 'Services', fragment: 'services' },
        { href: '/', label: 'Blog', fragment: 'blog' },
        { href: '/', label: 'Visit', fragment: 'visit' },
        { href: '/admin/dashboard', label: 'Admin' },
    ];
    socialMediaMapper = this.clinic.socialMediaMapper;
    workingHoursList = this.clinic.workingHoursList;
    currentYear = new Date().getFullYear();
    scrollTo = scrollToElement;
}
