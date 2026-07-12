import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicService } from '../../../services/clinic.service';
import { Section } from '../../../components/section/section';

@Component({
    selector: 'app-blog',
    imports: [RouterLink, Section],
    template: `
        <app-section id="blog" class="bg-white border-y border-slate-200">
            <div class="flex items-center justify-between mb-12">
                <div>
                    <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                        Latest Insights
                    </h2>
                    <p class="text-slate-600">Expert advice and updates from our clinic.</p>
                </div>
                <a
                    routerLink="/blog"
                    class="text-blue-600 hover:text-blue-700 font-semibold text-sm shrink-0"
                >
                    View All
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @for (post of posts; track post.title) {
                    <div
                        class="rounded-xl border border-slate-200 overflow-hidden bg-white hover:shadow-lg transition"
                    >
                        <div
                            class="h-40 bg-linear-to-br from-slate-300 to-slate-200 flex items-center justify-center"
                        >
                            <p class="text-slate-400 text-sm">Blog Image</p>
                        </div>
                        <div class="p-4">
                            <span
                                class="inline-block px-2 py-0.5 text-xs font-medium bg-primary text-white rounded mb-2"
                            >
                                {{ post.category }}
                            </span>
                            <h3 class="font-semibold text-slate-900 mb-2 line-clamp-2">
                                {{ post.title }}
                            </h3>
                            <p class="text-sm text-slate-600 mb-4 line-clamp-2">
                                {{ post.excerpt }}
                            </p>
                            <p class="text-xs text-slate-500">{{ post.date }}</p>
                        </div>
                    </div>
                }
            </div>
        </app-section>
    `,
})
export class Blog {
    private clinic = inject(ClinicService);
    posts = this.clinic.posts;
}
