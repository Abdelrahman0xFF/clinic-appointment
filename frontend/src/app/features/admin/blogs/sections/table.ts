import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentEdit,
    fluentDelete,
    fluentCalendarClock,
    fluentNews,
    fluentAdd,
} from '@ng-icons/fluent-ui';
import { BlogDto } from '../../../../core/api/blog/blog.types';
import { UiButton } from '../../../../shared/ui/button';

@Component({
    selector: 'app-blogs-table',
    imports: [NgIcon, UiButton],
    viewProviders: [
        provideIcons({
            fluentEdit,
            fluentDelete,
            fluentCalendarClock,
            fluentNews,
            fluentAdd,
        }),
    ],
    template: `
        @if (posts.length > 0) {
            <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900">Title</th>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900">Category</th>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900">Date</th>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200">
                            @for (post of posts; track post.id) {
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="px-6 py-4 text-slate-900 font-medium max-w-xs truncate">{{ post.title }}</td>
                                    <td class="px-6 py-4 text-slate-600">{{ post.category }}</td>
                                    <td class="px-6 py-4">
                                        <span [class]="statusBadgeClass(post.status)">
                                            {{ post.status === 'published' ? 'Published' : 'Draft' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-slate-600 whitespace-nowrap">
                                        <div class="flex items-center gap-1.5">
                                            <ng-icon name="fluentCalendarClock" size="16" class="text-slate-400 shrink-0" />
                                            {{ post.date }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex gap-2">
                                            <app-button variant="outline" size="icon-sm" (click)="edit.emit(post)">
                                                <ng-icon name="fluentEdit" size="16" />
                                            </app-button>
                                            <app-button variant="destructive" size="icon-sm" (click)="delete.emit(post)">
                                                <ng-icon name="fluentDelete" size="16" />
                                            </app-button>
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        } @else {
            <div class="flex flex-col items-center justify-center py-24 text-center">
                <span class="size-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <ng-icon name="fluentNews" size="24" class="text-slate-400" />
                </span>
                <h3 class="text-slate-900 font-semibold mb-1">No blog posts yet</h3>
                <p class="text-slate-500 text-sm mb-6">Create your first blog post to get started.</p>
                <app-button (click)="create.emit()">
                    <ng-icon name="fluentAdd" size="20" />
                    Create Post
                </app-button>
            </div>
        }
    `,
})
export class BlogsTable {
    @Input() posts: BlogDto[] = [];
    @Output() create = new EventEmitter<void>();
    @Output() edit = new EventEmitter<BlogDto>();
    @Output() delete = new EventEmitter<BlogDto>();

    statusBadgeClass(status: string): string {
        if (status === 'published') {
            return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700';
        }
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700';
    }
}
