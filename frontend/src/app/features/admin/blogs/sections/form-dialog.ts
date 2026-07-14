import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentDismiss,
    fluentImage,
} from '@ng-icons/fluent-ui';
import { Blog } from '../../../../core/clinic';
import { UiButton } from '../../../../shared/ui/button';
import { FormsModule } from '@angular/forms';

export interface BlogFormData {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    isPublished: boolean;
    coverPreview: string;
}

@Component({
    selector: 'app-blogs-form-dialog',
    imports: [NgIcon, UiButton, FormsModule],
    viewProviders: [
        provideIcons({
            fluentDismiss,
            fluentImage,
        }),
    ],
    template: `
        @if (dialogOpen) {
            <div class="fixed inset-0 z-50 flex items-start justify-center pt-12"
                 (click)="dismiss.emit()"
                 (keydown.escape)="dismiss.emit()"
                 tabindex="0"
                 role="dialog">
                <div class="fixed inset-0 bg-black/40"></div>
                <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl border border-slate-200 z-10 max-h-[85vh] flex flex-col"
                     tabindex="-1"
                     (click)="$event.stopPropagation()"
                     (keydown)="$event.stopPropagation()">
                    <div class="flex items-center justify-between p-6 border-b border-slate-200 shrink-0">
                        <h2 class="text-lg font-bold text-slate-900">{{ post ? 'Edit Post' : 'New Blog Post' }}</h2>
                        <button (click)="dismiss.emit()"
                                class="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer">
                            <ng-icon name="fluentDismiss" size="20" />
                        </button>
                    </div>

                    <div class="p-6 space-y-5 overflow-y-auto">
                        <div>
                            <label for="blog-title" class="block text-sm font-medium text-slate-900 mb-1.5">Title *</label>
                            <input id="blog-title" type="text" [(ngModel)]="formTitle"
                                   placeholder="Article title"
                                   class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                        </div>

                        <div>
                            <label for="blog-category" class="block text-sm font-medium text-slate-900 mb-1.5">Category *</label>
                            <select id="blog-category" [(ngModel)]="formCategory"
                                    class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer">
                                <option value="" disabled>Select category</option>
                                @for (cat of categories; track cat) {
                                    <option [value]="cat">{{ cat }}</option>
                                }
                            </select>
                        </div>

                        <div>
                            <label for="blog-cover" class="block text-sm font-medium text-slate-900 mb-1.5">Cover Image</label>
                            <div tabindex="0" role="button"
                                 class="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-300 transition-colors outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                 (click)="fileInput.click()"
                                 (keydown.enter)="fileInput.click()"
                                 (keydown.space)="fileInput.click(); $event.preventDefault()">
                                @if (formCoverPreview) {
                                    <img [src]="formCoverPreview" alt="Cover preview" class="max-h-48 mx-auto rounded-lg object-cover" />
                                    <p class="text-xs text-slate-400 mt-2">Click to change image</p>
                                } @else {
                                    <ng-icon name="fluentImage" size="32" class="text-slate-300 mb-2" />
                                    <p class="text-sm text-slate-500">Click to upload a cover image</p>
                                    <p class="text-xs text-slate-400 mt-1">PNG, JPG or WebP</p>
                                }
                            </div>
                            <input #fileInput id="blog-cover" type="file" accept="image/png,image/jpeg,image/webp"
                                   class="hidden" (change)="onFileSelected($event)" />
                        </div>

                        <div>
                            <label for="blog-excerpt" class="block text-sm font-medium text-slate-900 mb-1.5">Excerpt *</label>
                            <textarea id="blog-excerpt" [(ngModel)]="formExcerpt"
                                      placeholder="Brief description of the article" rows="2"
                                      class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"></textarea>
                        </div>

                        <div>
                            <label for="blog-content" class="block text-sm font-medium text-slate-900 mb-1.5">Content *</label>
                            <textarea id="blog-content" [(ngModel)]="formContent"
                                      placeholder="Article content" rows="8"
                                      class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-y font-mono"></textarea>
                        </div>

                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" [(ngModel)]="formIsPublished"
                                   class="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            <span class="text-sm text-slate-700">Publish immediately</span>
                        </label>
                    </div>

                    <div class="flex justify-end gap-3 p-6 border-t border-slate-200 shrink-0">
                        <app-button variant="outline" (click)="dismiss.emit()">Cancel</app-button>
                        <app-button (click)="emitSave()">
                            {{ post ? 'Save Changes' : formIsPublished ? 'Publish' : 'Save as Draft' }}
                        </app-button>
                    </div>
                </div>
            </div>
        }
    `,
})
export class BlogsFormDialog implements OnChanges {
    @Input() dialogOpen = false;
    @Input() post: Blog | null = null;
    @Input() categories: string[] = [];
    @Output() save = new EventEmitter<BlogFormData>();
    @Output() dismiss = new EventEmitter<void>();

    formTitle = '';
    formCategory = '';
    formExcerpt = '';
    formContent = '';
    formIsPublished = true;
    formCoverPreview = '';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['post'] && this.post) {
            this.formTitle = this.post.title;
            this.formCategory = this.post.category;
            this.formExcerpt = this.post.excerpt;
            this.formContent = this.post.content;
            this.formIsPublished = this.post.status === 'published';
            this.formCoverPreview = this.post.coverImageUrl;
        } else if (changes['dialogOpen'] && !this.dialogOpen) {
            this.resetForm();
        }
    }

    resetForm() {
        this.formTitle = '';
        this.formCategory = '';
        this.formExcerpt = '';
        this.formContent = '';
        this.formIsPublished = true;
        this.formCoverPreview = '';
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.formCoverPreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    emitSave() {
        if (!this.formTitle || !this.formCategory || !this.formExcerpt || !this.formContent) {
            return;
        }
        this.save.emit({
            title: this.formTitle,
            category: this.formCategory,
            excerpt: this.formExcerpt,
            content: this.formContent,
            isPublished: this.formIsPublished,
            coverPreview: this.formCoverPreview,
        });
    }
}
