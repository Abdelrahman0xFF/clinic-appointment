import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock, fluentCalendarClock } from '@ng-icons/fluent-ui';
import { Blog } from '../../../core/clinic';

@Component({
    selector: 'app-blog-card',
    imports: [NgIcon, RouterLink],
    viewProviders: [
        provideIcons({
            fluentClock,
            fluentCalendarClock,
        }),
    ],
    template: `
        <a
            [routerLink]="['/blog', post.id]"
            class="group block rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all"
        >
            <div class="aspect-video bg-slate-100 overflow-hidden">
                @if (post.coverImageUrl) {
                    <img
                        [src]="post.coverImageUrl"
                        [alt]="post.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                } @else {
                    <div class="w-full h-full flex items-center justify-center text-slate-300">
                        <ng-icon name="fluentCalendarClock" size="32" />
                    </div>
                }
            </div>
            <div class="p-5">
                <div class="flex items-center gap-3 mb-3">
                    <span
                        class="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
                    >
                        {{ post.category }}
                    </span>
                    <span class="text-xs text-slate-400 flex items-center gap-1">
                        <ng-icon name="fluentClock" size="13" />
                        {{ post.readTimeMinutes }} min read
                    </span>
                </div>
                <h3
                    class="font-semibold text-slate-900 group-hover:text-blue-600 transition mb-2 leading-snug"
                >
                    {{ post.title }}
                </h3>
                <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {{ post.excerpt }}
                </p>
                <div class="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <span class="text-xs text-slate-400">{{ post.date }}</span>
                </div>
            </div>
        </a>
    `,
})
export class BlogCard {
    @Input() post!: Blog;
}
