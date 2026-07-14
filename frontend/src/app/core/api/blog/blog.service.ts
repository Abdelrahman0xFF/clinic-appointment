import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../shared/api.types';
import { BlogDto } from './blog.types';

@Injectable({ providedIn: 'root' })
export class BlogService {
    private http = inject(HttpClient);
    private base = '/api/blog';

    posts = signal<BlogDto[]>([]);
    selectedPost = signal<BlogDto | null>(null);
    total = signal(0);
    page = signal(1);
    totalPages = signal(0);

    getPosts(page = 1, limit = 20, status?: string): void {
        let params = new HttpParams().set('page', page).set('limit', limit);
        if (status) {
            params = params.set('status', status);
        }

        this.http
            .get<PaginatedResponse<BlogDto>>(this.base, { params })
            .pipe(
                map((res) => {
                    this.total.set(res.total);
                    this.page.set(res.page);
                    this.totalPages.set(res.totalPages);
                    return res.data;
                }),
            )
            .subscribe({
                next: (data) => this.posts.set(data),
                error: (err) => console.error('Failed to load blog posts', err),
                complete: () => console.log('Blog posts loaded'),
            });
    }

    getPostById(id: string): void {
        this.http
            .get<ApiResponse<BlogDto>>(`${this.base}/${id}`)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (data) => this.selectedPost.set(data),
                error: (err) => console.error('Failed to load blog post', err),
                complete: () => console.log('Blog post loaded'),
            });
    }

    createPost(formData: FormData): void {
        this.http
            .post<ApiResponse<BlogDto>>(this.base, formData)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (newPost) => {
                    this.posts.update((list) => [newPost, ...list]);
                    this.total.update((t) => t + 1);
                },
                error: (err) => console.error('Failed to create blog post', err),
                complete: () => console.log('Blog post created'),
            });
    }

    updatePost(id: string, formData: FormData): void {
        this.http
            .put<ApiResponse<BlogDto>>(`${this.base}/${id}`, formData)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (updated) => {
                    this.posts.update((list) =>
                        list.map((p) => (p.id === id ? updated : p)),
                    );
                    if (this.selectedPost()?.id === id) {
                        this.selectedPost.set(updated);
                    }
                },
                error: (err) => console.error('Failed to update blog post', err),
                complete: () => console.log('Blog post updated'),
            });
    }

    deletePost(id: string): void {
        this.http
            .delete<ApiResponse<void>>(`${this.base}/${id}`)
            .subscribe({
                next: () => {
                    this.posts.update((list) => list.filter((p) => p.id !== id));
                    this.total.update((t) => t - 1);
                    if (this.selectedPost()?.id === id) {
                        this.selectedPost.set(null);
                    }
                },
                error: (err) => console.error('Failed to delete blog post', err),
                complete: () => console.log('Blog post deleted'),
            });
    }
}
