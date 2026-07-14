import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../../../shared/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { scrollToElement } from '../../../../utils/scroll';
import { Section } from '../../../../shared/section';

@Component({
    viewProviders: [provideIcons({ heroStar })],
    selector: 'app-hero',
    imports: [RouterLink, UiButton, NgIcon, Section],
    template: `
        <app-section id="hero" [class]="class">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                    <span
                        class="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                        <span class="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Accepting New Patients
                    </span>

                    <h1
                        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight"
                    >
                        Expert Dermatology Care
                        <span
                            class="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-500"
                        >
                            for Healthy Skin
                        </span>
                    </h1>

                    <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                        With over a decade of experience, Dr. Ahmed provides comprehensive
                        dermatological care using the latest medical advancements. Your skin health
                        is our priority.
                    </p>

                    <div class="flex flex-wrap gap-2 mb-10">
                        <span
                            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 bg-white/80"
                        >
                            <span class="size-1.5 rounded-full bg-blue-500"></span>
                            Consultant Dermatologist
                        </span>
                        <span
                            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 bg-white/80"
                        >
                            <span class="size-1.5 rounded-full bg-blue-500"></span>
                            MD Cairo University
                        </span>
                        <span
                            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 bg-white/80"
                        >
                            <span class="size-1.5 rounded-full bg-blue-500"></span>
                            Certified Surgery
                        </span>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 mb-12">
                        <a routerLink="/booking">
                            <app-button
                                size="lg"
                                class="w-full sm:w-auto shadow-md shadow-blue-200"
                            >
                                <ng-icon name="heroStar" size="18" class="text-yellow-300" />
                                Book Appointment
                            </app-button>
                        </a>
                        <button
                            type="button"
                            (click)="scrollTo('services')"
                            class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-6 py-2.5 text-sm font-medium transition-all cursor-pointer"
                        >
                            View Services
                        </button>
                    </div>

                    <div class="grid grid-cols-3 gap-6 sm:gap-10">
                        <div>
                            <p class="text-3xl font-bold text-slate-900">10+</p>
                            <p class="text-sm text-slate-500 mt-1">Years Experience</p>
                        </div>
                        <div>
                            <p class="text-3xl font-bold text-slate-900">2000+</p>
                            <p class="text-sm text-slate-500 mt-1">Patients Treated</p>
                        </div>
                        <div>
                            <div class="flex items-center gap-1 mb-0.5">
                                <p class="text-3xl font-bold text-slate-900">4.9</p>
                                <span class="text-lg text-slate-400">/5</span>
                            </div>
                            <p class="text-sm text-slate-500 mt-1">Patient Rating</p>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div
                        class="bg-slate-200 rounded-2xl aspect-square flex items-center justify-center overflow-hidden"
                    >
                        <div
                            class="w-full h-full bg-linear-to-br from-slate-300 to-slate-200 flex items-center justify-center"
                        >
                            <div class="text-center">
                                <div class="text-6xl mb-2">👨‍⚕️</div>
                                <p class="text-slate-500 font-medium">Doctor Profile Photo</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="absolute -bottom-6 -right-6 w-56 p-4 bg-white rounded-xl shadow-xl border border-slate-200"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="size-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="heroStar" size="24" color="#2563eb" />
                            </div>
                            <div>
                                <p class="font-semibold text-slate-900 text-sm">
                                    10+ Years Experience
                                </p>
                                <p class="text-xs text-slate-600">Trusted Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </app-section>
    `,
})
export class Hero {
    @Input() class = '';
    scrollTo = scrollToElement;
}
