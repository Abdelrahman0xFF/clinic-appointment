import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAdd,
} from '@ng-icons/fluent-ui';
import { ClinicService, Blog } from '../../core/clinic';
import { UiButton } from '../../shared/ui/button';
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

            <app-blogs-table
                [posts]="service.blogPosts"
                (create)="openCreateDialog()"
                (edit)="openEditDialog($event)"
                (delete)="openDeleteDialog($event)"
            />
        </div>

        <app-blogs-form-dialog
            [dialogOpen]="dialogOpen"
            [post]="editingPost"
            [categories]="categories"
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
export class Blogs {
    service = inject(ClinicService);
    categories = CATEGORIES;

    dialogOpen = false;
    editingPost: Blog | null = null;

    deleteDialogOpen = false;
    deletingPost: Blog | null = null;

    openCreateDialog() {
        this.editingPost = null;
        this.dialogOpen = true;
    }

    openEditDialog(post: Blog) {
        this.editingPost = post;
        this.dialogOpen = true;
    }

    closeDialog() {
        this.dialogOpen = false;
        this.editingPost = null;
    }

    savePost(data: BlogFormData) {
        const status = data.isPublished ? ('published' as const) : ('draft' as const);
        const date = new Date().toISOString().split('T')[0];
        const readTimeMinutes = Math.max(1, Math.ceil(data.content.split(/\s+/).length / 200));

        if (this.editingPost) {
            this.service.updateBlogPost(this.editingPost.id, {
                title: data.title,
                category: data.category,
                excerpt: data.excerpt,
                content: data.content,
                coverImageUrl: data.coverPreview || this.editingPost.coverImageUrl,
                date,
                readTimeMinutes,
                status,
            });
        } else {
            this.service.addBlogPost({
                title: data.title,
                category: data.category,
                excerpt: data.excerpt,
                content: data.content,
                coverImageUrl:
                    data.coverPreview ||
                    'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
                author: '507f1f77bcf86cd799439011',
                date,
                readTimeMinutes,
                tableOfContents: [{ id: 'intro', label: 'Introduction', level: 1 }],
                faqs: [],
                status,
            });
        }

        this.closeDialog();
    }

    openDeleteDialog(post: Blog) {
        this.deletingPost = post;
        this.deleteDialogOpen = true;
    }

    closeDeleteDialog() {
        this.deleteDialogOpen = false;
        this.deletingPost = null;
    }

    confirmDelete() {
        if (this.deletingPost) {
            this.service.deleteBlogPost(this.deletingPost.id);
        }
        this.closeDeleteDialog();
    }
}
