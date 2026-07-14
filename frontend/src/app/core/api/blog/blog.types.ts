export interface TocEntry {
    id: string;
    label: string;
    level: number;
}

export interface FaqEntry {
    question: string;
    answer: string;
}

export interface BlogDto {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    coverImageUrl: string;
    content: string;
    author: string;
    date: string;
    readTimeMinutes: number;
    tableOfContents: TocEntry[];
    faqs: FaqEntry[];
    status: 'published' | 'draft';
    createdAt: string;
    updatedAt: string;
}

export interface BlogPost {
    title: string;
    excerpt: string;
    category: string;
    date: string;
}
