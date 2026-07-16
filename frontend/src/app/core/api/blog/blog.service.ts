import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../shared/api.types';
import { BlogDto } from './blog.types';

@Injectable({ providedIn: 'root' })
export class BlogApi {
    private http = inject(HttpClient);
    private base = '/api/blog';

    posts = signal<BlogDto[]>([]);
    selectedPost = signal<BlogDto | null>(null);
    total = signal(0);
    page = signal(1);
    totalPages = signal(0);

    getPosts(page = 1, limit = 20, status?: string): void {
        this.getAll({ page, limit, status })
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
            });
    }

    getPostById(id: string): void {
        this.getById(id)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (data) => this.selectedPost.set(data),
                error: (err) => console.error('Failed to load blog post', err),
            });
    }

    createPost(formData: FormData): void {
        this.create(formData)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (newPost) => {
                    this.posts.update((list) => [newPost, ...list]);
                    this.total.update((t) => t + 1);
                },
                error: (err) => console.error('Failed to create blog post', err),
            });
    }

    updatePost(id: string, formData: FormData): void {
        this.update(id, formData)
            .pipe(map((res) => res.data!))
            .subscribe({
                next: (updated) => {
                    this.posts.update((list) => list.map((p) => (p.id === id ? updated : p)));
                    if (this.selectedPost()?.id === id) {
                        this.selectedPost.set(updated);
                    }
                },
                error: (err) => console.error('Failed to update blog post', err),
            });
    }

    deletePost(id: string): void {
        this.delete(id).subscribe({
            next: () => {
                this.posts.update((list) => list.filter((p) => p.id !== id));
                this.total.update((t) => t - 1);
                if (this.selectedPost()?.id === id) {
                    this.selectedPost.set(null);
                }
            },
            error: (err) => console.error('Failed to delete blog post', err),
        });
    }

    getAll(params?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Observable<PaginatedResponse<BlogDto>> {
        let p = new HttpParams();
        if (params) {
            if (params.page) p = p.set('page', params.page);
            if (params.limit) p = p.set('limit', params.limit);
            if (params.status) p = p.set('status', params.status);
        }
        return this.http.get<PaginatedResponse<BlogDto>>(this.base, { params: p });
    }

    getById(id: string): Observable<ApiResponse<BlogDto>> {
        return this.http.get<ApiResponse<BlogDto>>(`${this.base}/${id}`);
    }

    create(formData: FormData): Observable<ApiResponse<BlogDto>> {
        return this.http.post<ApiResponse<BlogDto>>(this.base, formData);
    }

    update(id: string, formData: FormData): Observable<ApiResponse<BlogDto>> {
        return this.http.put<ApiResponse<BlogDto>>(`${this.base}/${id}`, formData);
    }

    delete(id: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
    }
}
