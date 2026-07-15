import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentAdd } from '@ng-icons/fluent-ui';
import { BlogApi } from '../../../core/api/blog/blog.service';
import { BlogDto } from '../../../core/api/blog/blog.types';
import { AuthService } from '../../../core/auth/auth.service';
import { UiButton } from '../../../shared/ui/button';
import { BlogsTable } from './sections/table';
import { BlogsFormDialog, BlogFormData } from './sections/form-dialog';
import { BlogsDeleteDialog } from './sections/delete-dialog';

const CATEGORIES = ['Skin & Beauty', 'General Health', 'Patient Guides', 'Clinic News'];

@Component({
    selector: 'app-blogs',
    imports: [NgIcon, UiButton, BlogsTable, BlogsFormDialog, BlogsDeleteDialog],
    viewProviders: [
        provideIcons({
            fluentAdd,
        }),
    ],
    template: `
        <div>
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-slate-900">Blog Manager</h1>
                <app-button (click)="openCreateDialog()">
                    <ng-icon name="fluentAdd" size="20" />
                    New Post
                </app-button>
            </div>

            @if (loading()) {
                <div class="flex items-center justify-center py-16">
                    <span
                        class="size-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"
                    ></span>
                </div>
            } @else {
                <app-blogs-table
                    [posts]="posts()"
                    (create)="openCreateDialog()"
                    (edit)="openEditDialog($event)"
                    (delete)="openDeleteDialog($event)"
                />
            }
        </div>

        <app-blogs-form-dialog
            [dialogOpen]="dialogOpen"
            [post]="editingPost"
            [categories]="categories"
            [defaultAuthor]="defaultAuthor"
            [saving]="saving()"
            [error]="formError()"
            (save)="savePost($event)"
            (dismiss)="closeDialog()"
        />

        <app-blogs-delete-dialog
            [open]="deleteDialogOpen"
            [postTitle]="deletingPost?.title ?? ''"
            (confirm)="confirmDelete()"
            (dismiss)="closeDeleteDialog()"
        />
    `,
})
export class Blogs implements OnInit {
    private blogApi = inject(BlogApi);
    private auth = inject(AuthService);

    categories = CATEGORIES;

    posts = signal<BlogDto[]>([]);
    loading = signal(true);
    saving = signal(false);
    formError = signal('');

    dialogOpen = false;
    editingPost: BlogDto | null = null;

    deleteDialogOpen = false;
    deletingPost: BlogDto | null = null;

    ngOnInit() {
        this.loadPosts();
    }

    private loadPosts() {
        this.loading.set(true);
        this.blogApi.getAll({ limit: 100 }).subscribe({
            next: (res) => this.posts.set(res.data),
            error: () => this.loading.set(false),
            complete: () => this.loading.set(false),
        });
    }

    get defaultAuthor(): string {
        return this.auth.admin()?.username ?? 'Admin';
    }

    openCreateDialog() {
        this.editingPost = null;
        this.formError.set('');
        this.dialogOpen = true;
    }

    openEditDialog(post: BlogDto) {
        this.editingPost = post;
        this.formError.set('');
        this.dialogOpen = true;
    }

    closeDialog() {
        this.dialogOpen = false;
        this.editingPost = null;
        this.formError.set('');
    }

    savePost(data: BlogFormData) {
        this.saving.set(true);
        this.formError.set('');
        const fd = new FormData();
        fd.append('title', data.title);
        fd.append('category', data.category);
        fd.append('excerpt', data.excerpt);
        fd.append('content', data.content);
        fd.append('author', data.author);
        fd.append('date', data.date);
        fd.append('status', data.isPublished ? 'published' : 'draft');
        fd.append('readTimeMinutes', String(data.readTimeMinutes));
        if (data.tableOfContents.length > 0) {
            fd.append('tableOfContents', JSON.stringify(data.tableOfContents));
        }
        if (data.faqs.length > 0) {
            fd.append('faqs', JSON.stringify(data.faqs));
        }
        if (data.coverFile) {
            fd.append('coverImage', data.coverFile);
        }

        const request = this.editingPost
            ? this.blogApi.update(this.editingPost.id, fd)
            : this.blogApi.create(fd);

        request.subscribe({
            next: () => {
                this.saving.set(false);
                this.closeDialog();
                this.loadPosts();
            },
            error: (err) => {
                this.saving.set(false);
                this.formError.set(err.error?.message || 'Failed to save blog post');
            },
        });
    }

    openDeleteDialog(post: BlogDto) {
        this.deletingPost = post;
        this.deleteDialogOpen = true;
    }

    closeDeleteDialog() {
        this.deleteDialogOpen = false;
        this.deletingPost = null;
    }

    confirmDelete() {
        if (!this.deletingPost) return;
        this.blogApi.delete(this.deletingPost.id).subscribe({
            next: () => {
                this.posts.update((list) => list.filter((p) => p.id !== this.deletingPost!.id));
                this.closeDeleteDialog();
            },
            error: (err) => {
                console.error('Failed to delete blog post', err);
                this.closeDeleteDialog();
            },
        });
    }
}
