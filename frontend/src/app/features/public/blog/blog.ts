import { Component, computed, inject, OnInit } from '@angular/core';
import { BlogApi } from '../../../core/api/blog/blog.service';
import { Section } from '../../../shared/section';
import { BlogCard } from './sections/blog-card';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll-animate.directive';

const CATEGORIES = ['All', 'Skin & Beauty', 'General Health', 'Patient Guides', 'Clinic News'];

@Component({
    selector: 'app-blog',
    imports: [Section, BlogCard, ScrollAnimateDirective],
    template: `
        <app-section
            title="Our Blog"
            description="Insights, guides, and updates from our clinic"
            class="bg-white"
            id="blog-listing"
        >
            <div class="flex gap-2 mb-8 flex-wrap">
                @for (cat of categories; track cat; let i = $index) {
                    <button
                        appScrollAnimate animateDirection="right" animateDelay="{{ i * 50 }}ms"
                        type="button"
                        (click)="selectedCategory = cat"
                        [class]="
                            'px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ' +
                            (selectedCategory === cat
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                        "
                    >
                        {{ cat }}
                    </button>
                }
            </div>

            @if (filteredPosts().length > 0) {
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (post of filteredPosts(); track post.id; let j = $index) {
                        <div appScrollAnimate animateDirection="up" animateDelay="{{ j * 100 }}ms">
                            <app-blog-card [post]="post" />
                        </div>
                    }
                </div>
            } @else {
                <div class="text-center py-16">
                    <p class="text-slate-500">No posts found in this category.</p>
                </div>
            }
        </app-section>
    `,
})
export class Blog implements OnInit {
    private blog = inject(BlogApi);
    categories = CATEGORIES;
    selectedCategory = 'All';

    filteredPosts = computed(() => {
        const posts = this.blog.posts();
        return this.selectedCategory === 'All'
            ? posts
            : posts.filter((p) => p.category === this.selectedCategory);
    });

    ngOnInit() {
        this.blog.getPosts();
    }
}
