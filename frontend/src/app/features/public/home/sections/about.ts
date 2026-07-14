import { Component, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentShield, fluentHeartPulse, fluentPeople, fluentReward } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [
        provideIcons({
            fluentShield,
            fluentHeartPulse,
            fluentPeople,
            fluentReward,
        }),
    ],
    selector: 'app-about',
    imports: [Section, NgIcon],
    template: `
        <app-section
            id="about"
            title="About Our Clinic"
            description="We are a leading healthcare provider committed to delivering exceptional medical services and patient care."
            [class]="class"
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="relative">
                    <div class="rounded-2xl overflow-hidden aspect-4/3 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1769698678497-c41f0ab47c3e?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                            alt="Modern medical centre"
                            class="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div
                        class="absolute -bottom-6 -left-6 w-48 p-4 bg-white rounded-xl shadow-lg border border-slate-100 hidden sm:block"
                    >
                        <p class="text-2xl font-bold text-blue-600">15+</p>
                        <p class="text-sm text-slate-600">Years of Medical Excellence</p>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="space-y-4">
                        <h3 class="text-2xl font-bold text-slate-900">
                            Your Trusted Partner in Dermatological Health
                        </h3>
                        <p class="text-slate-600 leading-relaxed">
                            At MediCare Clinic, we believe that everyone deserves access to
                            exceptional dermatological care. Our state-of-the-art facility combines
                            cutting-edge technology with compassionate, patient-centered treatment
                            approaches.
                        </p>
                        <p class="text-slate-600 leading-relaxed">
                            Led by Dr. Ahmed, a consultant dermatologist with over 15 years of
                            experience, our team is dedicated to helping you achieve and maintain
                            healthy, radiant skin through personalized treatment plans.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div
                            class="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100"
                        >
                            <span
                                class="size-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="fluentShield" size="20" class="text-blue-600" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 text-sm">Board Certified</p>
                                <p class="text-xs text-slate-500 mt-0.5">Licensed dermatologists</p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100"
                        >
                            <span
                                class="size-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="fluentHeartPulse" size="20" class="text-blue-600" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 text-sm">Modern Facility</p>
                                <p class="text-xs text-slate-500 mt-0.5">Latest laser technology</p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100"
                        >
                            <span
                                class="size-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="fluentPeople" size="20" class="text-blue-600" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 text-sm">Patient First</p>
                                <p class="text-xs text-slate-500 mt-0.5">Personalized care plans</p>
                            </div>
                        </div>
                        <div
                            class="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100"
                        >
                            <span
                                class="size-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <ng-icon name="fluentReward" size="20" class="text-blue-600" />
                            </span>
                            <div>
                                <p class="font-semibold text-slate-900 text-sm">Award Winning</p>
                                <p class="text-xs text-slate-500 mt-0.5">Recognized excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </app-section>
    `,
})
export class About {
    @Input() class = '';
}
