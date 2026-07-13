import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicService } from '../../../core/clinic';
import { Section } from '../../../shared/section';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentArrowRight, fluentClock, fluentBookOpen } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [
        provideIcons({
            fluentArrowRight,
            fluentClock,
            fluentBookOpen,
        }),
    ],
    selector: 'app-blog',
    imports: [RouterLink, Section, NgIcon],
    template: `
        <app-section
            id="blog"
            title="Latest Insights"
            description="Expert advice and updates from our clinic."
            [class]="class"
        >
            <div class="flex items-center justify-between mb-10">
                <p class="text-sm text-slate-500">Stay informed with the latest in dermatology</p>
                <a
                    routerLink="/blog"
                    class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
                >
                    View All Articles
                    <ng-icon
                        name="fluentArrowRight"
                        size="16"
                        class="group-hover:translate-x-0.5 transition-transform"
                    />
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                @for (post of posts; track post.title) {
                    <div
                        class="group rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div
                            class="relative h-44 bg-linear-to-br from-blue-100 via-blue-50 to-blue-50 flex items-center justify-center overflow-hidden"
                        >
                            <div
                                class="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                            ></div>
                            <ng-icon
                                name="fluentBookOpen"
                                size="36"
                                class="text-slate-300 group-hover:text-slate-400 transition-colors"
                            />
                            <div
                                class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_60%)]"
                            ></div>
                            <span
                                class="absolute top-3 left-3 inline-flex px-2.5 py-1 text-xs font-medium bg-white/90 text-blue-700 rounded-full backdrop-blur-sm shadow-sm"
                            >
                                {{ post.category }}
                            </span>
                        </div>
                        <div class="p-5 flex flex-col flex-1">
                            <h3
                                class="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                            >
                                {{ post.title }}
                            </h3>
                            <p
                                class="text-sm text-slate-500 mb-4 line-clamp-2 flex-1 leading-relaxed"
                            >
                                {{ post.excerpt }}
                            </p>
                            <div
                                class="flex items-center justify-between pt-3 border-t border-slate-100"
                            >
                                <div class="flex items-center gap-1.5 text-xs text-slate-400">
                                    <ng-icon name="fluentClock" size="12" />
                                    {{ post.date }}
                                </div>
                                <span
                                    class="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors"
                                >
                                    Read more
                                </span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </app-section>
    `,
})
export class Blog {
    @Input() class = '';
    private clinic = inject(ClinicService);
    posts = this.clinic.posts;
}
