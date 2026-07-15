import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentDismiss,
    fluentImage,
    fluentAdd,
    fluentDelete,
    fluentChevronDown,
} from '@ng-icons/fluent-ui';
import { BlogDto } from '../../../../core/api/blog/blog.types';
import { UiButton } from '../../../../shared/ui/button';
import { FormsModule } from '@angular/forms';

export interface TocItem {
    id: string;
    label: string;
    level: number;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BlogFormData {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    isPublished: boolean;
    coverFile?: File;
    coverPreview: string;
    author: string;
    date: string;
    readTimeMinutes: number;
    tableOfContents: TocItem[];
    faqs: FaqItem[];
}

@Component({
    selector: 'app-blogs-form-dialog',
    imports: [NgIcon, UiButton, FormsModule],
    viewProviders: [
        provideIcons({
            fluentDismiss,
            fluentImage,
            fluentAdd,
            fluentDelete,
            fluentChevronDown,
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

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                <label for="blog-author" class="block text-sm font-medium text-slate-900 mb-1.5">Author *</label>
                                <input id="blog-author" type="text" [(ngModel)]="formAuthor"
                                       placeholder="Author name"
                                       class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                            </div>
                        </div>

                        <div>
                            <label for="blog-date" class="block text-sm font-medium text-slate-900 mb-1.5">Date *</label>
                            <input id="blog-date" type="date" [value]="formDate" (input)="formDate = $any($event.target).value"
                                   class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="blog-readtime" class="block text-sm font-medium text-slate-900 mb-1.5">Read Time (minutes)</label>
                                <input id="blog-readtime" type="number" min="1" [(ngModel)]="formReadTime"
                                       class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                            </div>
                        </div>

                        <div>
                            <label for="blog-cover" class="block text-sm font-medium text-slate-900 mb-1.5">
                                Cover Image @if (!post) { <span class="text-red-500">*</span> }
                            </label>
                            <div tabindex="0" role="button"
                                 class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-300 transition-colors outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                 [class.border-red-300]="showCoverError"
                                 [class.border-slate-200]="!showCoverError"
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
                            @if (showCoverError) {
                                <p class="text-xs text-red-500 mt-1">Cover image is required</p>
                            }
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

                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-sm font-medium text-slate-900">Table of Contents</span>
                                <button type="button" (click)="addTocItem()"
                                        class="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer">
                                    <ng-icon name="fluentAdd" size="14" />
                                    Add Entry
                                </button>
                            </div>
                            @for (item of formToc; track item.id; let i = $index) {
                                <div class="flex items-start gap-2 mb-2">
                                    <input type="text" [(ngModel)]="item.label"
                                           placeholder="Label" [name]="'toc-label-' + i"
                                           class="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                                    <input type="text" [(ngModel)]="item.id"
                                           placeholder="#id" [name]="'toc-id-' + i"
                                           class="w-24 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                                    <select [(ngModel)]="item.level" [name]="'toc-level-' + i"
                                            class="w-20 px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer">
                                        @for (lvl of [1,2,3,4,5,6]; track lvl) {
                                            <option [value]="lvl">H{{ lvl }}</option>
                                        }
                                    </select>
                                    <button type="button" (click)="removeTocItem(i)"
                                            class="size-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer shrink-0">
                                        <ng-icon name="fluentDelete" size="16" />
                                    </button>
                                </div>
                            }
                            @if (formToc.length === 0) {
                                <p class="text-xs text-slate-400">No table of contents entries. Add one above.</p>
                            }
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-sm font-medium text-slate-900">FAQ</span>
                                <button type="button" (click)="addFaq()"
                                        class="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer">
                                    <ng-icon name="fluentAdd" size="14" />
                                    Add FAQ
                                </button>
                            </div>
                            @for (faq of formFaqs; track $index; let i = $index) {
                                <div class="border border-slate-200 rounded-lg p-4 mb-3 space-y-3">
                                    <div class="flex items-start justify-between gap-2">
                                        <input type="text" [(ngModel)]="faq.question"
                                               placeholder="Question" [name]="'faq-q-' + i"
                                               class="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                                        <button type="button" (click)="removeFaq(i)"
                                                class="size-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer shrink-0">
                                            <ng-icon name="fluentDelete" size="16" />
                                        </button>
                                    </div>
                                    <textarea [(ngModel)]="faq.answer"
                                              placeholder="Answer" rows="2" [name]="'faq-a-' + i"
                                              class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"></textarea>
                                </div>
                            }
                            @if (formFaqs.length === 0) {
                                <p class="text-xs text-slate-400">No FAQs yet.</p>
                            }
                        </div>

                        @if (error) {
                            <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                                {{ error }}
                            </div>
                        }

                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" [(ngModel)]="formIsPublished"
                                   class="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            <span class="text-sm text-slate-700">Publish immediately</span>
                        </label>
                    </div>

                    <div class="flex justify-end gap-3 p-6 border-t border-slate-200 shrink-0">
                        <app-button variant="outline" (click)="dismiss.emit()">Cancel</app-button>
                        <app-button (click)="emitSave()" [loading]="saving">
                            {{ post ? (saving ? 'Saving...' : 'Save Changes') : formIsPublished ? (saving ? 'Publishing...' : 'Publish') : (saving ? 'Saving...' : 'Save as Draft') }}
                        </app-button>
                    </div>
                </div>
            </div>
        }
    `,
})
export class BlogsFormDialog implements OnChanges {
    @Input() dialogOpen = false;
    @Input() post: BlogDto | null = null;
    @Input() categories: string[] = [];
    @Input() defaultAuthor = '';
    @Input() saving = false;
    @Input() error = '';
    @Output() save = new EventEmitter<BlogFormData>();
    @Output() dismiss = new EventEmitter<void>();

    formTitle = '';
    formCategory = '';
    formAuthor = '';
    formDate = '';
    formReadTime = 5;
    formExcerpt = '';
    formContent = '';
    formIsPublished = true;
    formCoverPreview = '';
    formToc: TocItem[] = [];
    formFaqs: FaqItem[] = [];
    showCoverError = false;
    private selectedFile: File | undefined;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['post'] && this.post) {
            this.formTitle = this.post.title;
            this.formCategory = this.post.category;
            this.formAuthor = this.post.author;
            this.formDate = this.post.date;
            this.formExcerpt = this.post.excerpt;
            this.formContent = this.post.content;
            this.formReadTime = this.post.readTimeMinutes;
            this.formIsPublished = this.post.status === 'published';
            this.formCoverPreview = this.post.coverImageUrl;
            this.formToc = this.post.tableOfContents ? this.post.tableOfContents.map((t) => ({ ...t })) : [];
            this.formFaqs = this.post.faqs ? this.post.faqs.map((f) => ({ ...f })) : [];
            this.showCoverError = false;
        } else if (changes['dialogOpen'] && this.dialogOpen && !this.post) {
            this.resetForm();
        }
    }

    resetForm() {
        this.formTitle = '';
        this.formCategory = '';
        this.formAuthor = this.defaultAuthor;
        this.formDate = new Date().toISOString().split('T')[0];
        this.formExcerpt = '';
        this.formContent = '';
        this.formReadTime = 5;
        this.formIsPublished = true;
        this.formCoverPreview = '';
        this.formToc = [];
        this.formFaqs = [];
        this.selectedFile = undefined;
        this.showCoverError = false;
    }

    addTocItem() {
        const slug = this.formTitle
            ? this.formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + (this.formToc.length + 1)
            : 'section-' + (this.formToc.length + 1);
        this.formToc.push({ id: slug, label: '', level: 2 });
    }

    removeTocItem(index: number) {
        this.formToc.splice(index, 1);
    }

    addFaq() {
        this.formFaqs.push({ question: '', answer: '' });
    }

    removeFaq(index: number) {
        this.formFaqs.splice(index, 1);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            this.selectedFile = file;
            this.showCoverError = false;
            const reader = new FileReader();
            reader.onload = () => {
                this.formCoverPreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    emitSave() {
        if (!this.formTitle || !this.formCategory || !this.formAuthor || !this.formExcerpt || !this.formContent) {
            return;
        }
        if (!this.post && !this.selectedFile) {
            this.showCoverError = true;
            return;
        }
        this.save.emit({
            title: this.formTitle,
            category: this.formCategory,
            excerpt: this.formExcerpt,
            content: this.formContent,
            isPublished: this.formIsPublished,
            coverFile: this.selectedFile,
            coverPreview: this.formCoverPreview,
            author: this.formAuthor,
            date: this.formDate,
            readTimeMinutes: this.formReadTime,
            tableOfContents: this.formToc,
            faqs: this.formFaqs,
        });
    }
}
