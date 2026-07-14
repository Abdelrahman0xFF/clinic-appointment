import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentArrowLeft,
    fluentClock,
    fluentCalendarClock,
    fluentChevronDown,
    fluentBookmarkMultiple,
} from '@ng-icons/fluent-ui';
import { ClinicService } from '../../../core/clinic';

@Component({
    selector: 'app-article',
    imports: [NgIcon, RouterLink],
    viewProviders: [
        provideIcons({
            fluentArrowLeft,
            fluentClock,
            fluentCalendarClock,
            fluentChevronDown,
            fluentBookmarkMultiple,
        }),
    ],
    template: `
        @if (post) {
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <a
                    routerLink="/blog"
                    class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition mb-6"
                >
                    <ng-icon name="fluentArrowLeft" size="16" />
                    Back to Blog
                </a>

                <div class="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
                    <article>
                        <div class="rounded-xl overflow-hidden mb-8 aspect-2/1 bg-slate-100">
                            @if (post.coverImageUrl) {
                                <img
                                    [src]="post.coverImageUrl"
                                    [alt]="post.title"
                                    class="w-full h-full object-cover"
                                />
                            }
                        </div>

                        <div class="flex items-center gap-3 mb-4">
                            <span
                                class="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
                            >
                                {{ post.category }}
                            </span>
                            <span class="text-xs text-slate-400 flex items-center gap-1">
                                <ng-icon name="fluentClock" size="13" />
                                {{ post.readTimeMinutes }} min read
                            </span>
                            <span class="text-xs text-slate-400 flex items-center gap-1">
                                <ng-icon name="fluentCalendarClock" size="13" />
                                {{ post.date }}
                            </span>
                        </div>

                        <h1
                            class="text-2xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight"
                        >
                            {{ post.title }}
                        </h1>

                        <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                            {{ post.excerpt }}
                        </p>

                        <div class="prose prose-slate max-w-none">
                            @for (paragraph of contentParagraphs; track $index) {
                                <p class="text-slate-700 leading-relaxed mb-4">{{ paragraph }}</p>
                            }
                        </div>

                        @if (post.faqs.length > 0) {
                            <div class="mt-12 pt-8 border-t border-slate-200">
                                <h2 class="text-xl font-bold text-slate-900 mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div class="space-y-3">
                                    @for (faq of post.faqs; track $index) {
                                        <div
                                            class="rounded-xl border border-slate-200 bg-white overflow-hidden"
                                        >
                                            <button
                                                type="button"
                                                (click)="toggleFaq($index)"
                                                class="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-slate-50 transition"
                                            >
                                                <span
                                                    class="font-medium text-slate-900 text-sm pr-4"
                                                    >{{ faq.question }}</span
                                                >
                                                <ng-icon
                                                    name="fluentChevronDown"
                                                    size="16"
                                                    [class]="
                                                        'text-slate-400 shrink-0 transition-transform ' +
                                                        (openFaqIndex === $index
                                                            ? 'rotate-180'
                                                            : '')
                                                    "
                                                />
                                            </button>
                                            @if (openFaqIndex === $index) {
                                                <div class="px-5 pb-4">
                                                    <p
                                                        class="text-sm text-slate-600 leading-relaxed"
                                                    >
                                                        {{ faq.answer }}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </article>

                    <aside class="hidden lg:block">
                        <div class="sticky top-24">
                            @if (post.tableOfContents.length > 0) {
                                <div class="rounded-xl border border-slate-200 bg-white p-5">
                                    <div
                                        class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100"
                                    >
                                        <ng-icon
                                            name="fluentBookmarkMultiple"
                                            size="18"
                                            class="text-slate-400"
                                        />
                                        <h3 class="font-semibold text-slate-900 text-sm">
                                            Table of Contents
                                        </h3>
                                    </div>
                                    <ul class="space-y-2">
                                        @for (toc of post.tableOfContents; track toc.id) {
                                            <li>
                                                <a
                                                    [href]="'#' + toc.id"
                                                    [class]="
                                                        'block text-sm transition ' +
                                                        (toc.level === 1
                                                            ? 'font-medium text-slate-900'
                                                            : 'text-slate-500 hover:text-blue-600 pl-4')
                                                    "
                                                >
                                                    {{ toc.label }}
                                                </a>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    </aside>
                </div>
            </div>
        } @else {
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <p class="text-slate-500 mb-4">Post not found.</p>
                <a routerLink="/blog" class="text-blue-600 hover:underline text-sm">Back to Blog</a>
            </div>
        }
    `,
})
export class Article {
    private route = inject(ActivatedRoute);
    private clinic = inject(ClinicService);

    openFaqIndex: number | null = null;

    get post() {
        const id = this.route.snapshot.paramMap.get('id');
        return this.clinic.blogPosts.find((p) => p.id === id && p.status === 'published');
    }

    get contentParagraphs() {
        return this.post?.content.split('\n\n').filter(Boolean) ?? [];
    }

    toggleFaq(index: number) {
        this.openFaqIndex = this.openFaqIndex === index ? null : index;
    }
}
