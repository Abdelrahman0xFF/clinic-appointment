import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentStar } from '@ng-icons/fluent-ui';
import { Section } from '../../../../shared/section';
import { Video } from '../../../../shared/ui/video';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

const PATIENT_REVIEWS = [
    {
        name: 'Sarah M.',
        text: 'The team at MediCare completely transformed my skin. I struggled with acne for years and finally found a treatment that works.',
    },
    {
        name: 'Ahmed K.',
        text: 'Professional, caring, and excellent results. The laser treatment was virtually painless and the results exceeded my expectations.',
    },
    {
        name: 'Laila R.',
        text: 'I was nervous about my first dermatology visit, but the staff made me feel comfortable from the moment I walked in.',
    },
];

@Component({
    viewProviders: [provideIcons({ fluentStar })],
    selector: 'app-testimonials',
    imports: [Section, Video, NgIcon, ScrollAnimateDirective],
    template: `
        <app-section
            id="testimonials"
            title="What Our Patients Say"
            description="Hear from those who have experienced our care."
            [class]="class"
            sectionClass="py-8 lg:py-12"
            [fullHeight]="true"
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-start">
                <div class="space-y-4">
                    @for (review of reviews; track review.name; let i = $index) {
                        <div
                            appScrollAnimate animateDirection="right" animateDelay="{{ i * 150 }}ms"
                            class="relative p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div class="flex items-center gap-1 mb-3">
                                @for (star of [1, 2, 3, 4, 5]; track star) {
                                    <ng-icon name="fluentStar" size="20" color="#2B7FFF" />
                                }
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed mb-3">
                                "{{ review.text }}"
                            </p>
                            <p class="font-semibold text-slate-900 text-sm">{{ review.name }}</p>
                        </div>
                    }
                </div>

                <div appScrollAnimate animateDirection="left" animateDelay="200ms" class="lg:sticky lg:top-24">
                    <app-video
                        src="https://assets.mixkit.co/videos/7632/7632-720.mp4"
                        class="block"
                    />
                    <p class="text-xs text-slate-400 text-center mt-3">
                        Watch patient testimonials and virtual tour
                    </p>
                </div>
            </div>
        </app-section>
    `,
})
export class Testimonials {
    @Input() class = '';
    reviews = PATIENT_REVIEWS;
}
