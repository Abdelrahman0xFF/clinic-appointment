import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../../components/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroStar } from '@ng-icons/heroicons/outline';

@Component({
    viewProviders: [provideIcons({ heroStar })],
    selector: 'app-hero',
    imports: [RouterLink, UiButton, NgIcon],
    template: `
        <section id="hero" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                    <span
                        class="inline-block mb-4 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full"
                    >
                        Accepting New Patients
                    </span>

                    <h1
                        class="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight text-balance"
                    >
                        Expert Dermatology Care for Healthy Skin
                    </h1>

                    <p class="text-lg text-slate-600 mb-6 leading-relaxed">
                        With over a decade of experience, Dr. Ahmed provides comprehensive
                        dermatological care using the latest medical advancements. Your skin health
                        is our priority.
                    </p>

                    <div class="flex flex-wrap gap-2 mb-8">
                        <span
                            class="px-3 py-2 text-sm rounded-md border border-slate-200 text-slate-700 bg-white"
                        >
                            Consultant Dermatologist
                        </span>
                        <span
                            class="px-3 py-2 text-sm rounded-md border border-slate-200 text-slate-700 bg-white"
                        >
                            MD Cairo University
                        </span>
                        <span
                            class="px-3 py-2 text-sm rounded-md border border-slate-200 text-slate-700 bg-white"
                        >
                            Certified Surgery
                        </span>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-8">
                        <div>
                            <p class="text-2xl font-bold text-blue-600">10+</p>
                            <p class="text-sm text-slate-600">Years Experience</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-blue-600">2000+</p>
                            <p class="text-sm text-slate-600">Patients Treated</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-blue-600">4.9/5</p>
                            <p class="text-sm text-slate-600">Patient Rating</p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3">
                        <a routerLink="/booking">
                            <app-button size="lg" class="w-full sm:w-auto">
                                Book Appointment
                            </app-button>
                        </a>
                        <button
                            type="button"
                            (click)="scrollTo('services')"
                            class="inline-flex shrink-0 items-center justify-center rounded-lg border border-ring bg-background hover:bg-muted hover:text-foreground px-4 py-2 text-sm font-medium whitespace-nowrap transition h-9"
                        >
                            View Services
                        </button>
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
                                class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="heroStar" size="24" color="#059669" class="block" />
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
        </section>
    `,
})
export class Hero {
    scrollTo(id: string): void {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
