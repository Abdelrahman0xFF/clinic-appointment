import { Injectable } from '@angular/core';

export interface NavLink {
    href: string;
    label: string;
    fragment?: string;
}

export interface TocEntry {
    id: string;
    label: string;
    level: number;
}

export interface FaqEntry {
    question: string;
    answer: string;
}

export interface Blog {
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
    createdAt?: string;
    updatedAt?: string;
}

export interface Service {
    icon: string;
    title: string;
    description: string;
}

export interface BlogPost {
    title: string;
    excerpt: string;
    category: string;
    date: string;
}

export interface ResultItem {
    id: number;
    image?: string;
}

export interface Appointment {
    id: number;
    patientName: string;
    phone: string;
    date: string;
    time: string;
    reason: string;
    receiptImageUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface QueueEntry {
    id: string;
    patientName: string;
    time: string;
    stage: 'waiting' | 'in_consultation' | 'completed';
}

@Injectable({ providedIn: 'root' })
export class ClinicService {
    services: Service[] = [
        {
            icon: 'fluentStethoscope',
            title: 'General Dermatology',
            description: 'Treatment of skin diseases and conditions',
        },
        {
            icon: 'fluentHeartPulse',
            title: 'Skin Health',
            description: 'Preventive care for healthy skin',
        },
        {
            icon: 'fluentSyringe',
            title: 'Injectable Treatments',
            description: 'Botox, fillers, and aesthetic injectables',
        },
        {
            icon: 'fluentClipboardTaskListLtr',
            title: 'Laser Therapy',
            description: 'Advanced laser treatments for skin rejuvenation',
        },
        {
            icon: 'fluentPulse',
            title: 'Acne Treatment',
            description: 'Specialized acne management and scar revision',
        },
        {
            icon: 'fluentPeople',
            title: 'Consultations',
            description: 'Personalized consultation services for skin care needs',
        },
    ];

    posts: BlogPost[] = [
        {
            title: 'The Complete Guide to Modern Acne Treatment',
            excerpt:
                'Learn about the latest approaches to treating acne, from topical treatments to advanced laser therapy.',
            category: 'Skin & Beauty',
            date: 'Mar 15, 2024',
        },
        {
            title: "Managing Eczema: A Patient's Guide",
            excerpt:
                'Practical strategies for managing eczema symptoms and improving quality of life.',
            category: 'General Health',
            date: 'Mar 08, 2024',
        },
        {
            title: 'Understanding Laser Hair Removal',
            excerpt:
                'Everything you need to know about laser hair removal: how it works, effectiveness, and aftercare.',
            category: 'Skin & Beauty',
            date: 'Mar 01, 2024',
        },
    ];

    blogPosts: Blog[] = [
        {
            id: '6a4bc216abe75cf54a929096',
            title: 'The Complete Guide to Modern Acne Treatment',
            excerpt:
                'Learn about the latest approaches to treating acne, from topical treatments to advanced laser therapy.',
            category: 'Skin & Beauty',
            coverImageUrl:
                'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
            content:
                'Acne is one of the most common skin conditions affecting millions worldwide. In recent years, treatment approaches have evolved significantly, offering patients more effective and personalized options than ever before.\n\nFrom topical retinoids to advanced laser therapies, the landscape of acne treatment continues to expand. This guide covers the latest evidence-based approaches to managing acne at every stage.\n\nUnderstanding the root cause of acne is essential for effective treatment. Acne occurs when hair follicles become clogged with oil and dead skin cells. This creates an environment where bacteria can thrive, leading to inflammation and breakouts.\n\nModern treatment options range from topical medications like retinoids and benzoyl peroxide to oral medications and advanced procedures such as laser therapy and chemical peels. Your dermatologist can help determine the best approach based on your skin type and the severity of your condition.',
            author: '507f1f77bcf86cd799439011',
            date: '2024-10-24',
            readTimeMinutes: 8,
            tableOfContents: [
                { id: 'intro', label: 'Introduction', level: 1 },
                { id: 'understanding', label: 'Understanding Acne', level: 2 },
                { id: 'treatments', label: 'Modern Treatment Options', level: 2 },
            ],
            faqs: [
                { question: 'What causes acne?', answer: 'Acne is caused by a combination of factors including excess oil production, clogged pores, bacteria, and inflammation.' },
                { question: 'How long does treatment take?', answer: 'Most treatments require 8-12 weeks before significant improvement is visible.' },
            ],
            status: 'published',
            createdAt: '2026-07-06T14:56:22.715Z',
            updatedAt: '2026-07-06T14:57:09.234Z',
        },
        {
            id: 'b7f3a8e91c2d4f5a6b7c8d9e',
            title: 'Managing Eczema: A Patient\'s Guide',
            excerpt:
                'Practical strategies for managing eczema symptoms and improving quality of life with everyday skincare routines.',
            category: 'General Health',
            coverImageUrl:
                'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
            content:
                'Eczema, also known as atopic dermatitis, is a chronic skin condition that causes dry, itchy, and inflamed skin. While there is no cure, effective management strategies can significantly reduce symptoms and improve quality of life.\n\nMoisturizing is the cornerstone of eczema management. Apply a thick, fragrance-free moisturizer within three minutes of bathing to lock in moisture. Look for products containing ceramides, which help repair the skin barrier.\n\nIdentifying and avoiding triggers is equally important. Common triggers include harsh soaps, stress, certain fabrics like wool, and environmental factors such as dry air or pollen. Keeping a symptom diary can help you pinpoint your personal triggers.\n\nWhen flares occur, topical corticosteroids prescribed by your dermatologist can quickly reduce inflammation and itching. Use them as directed — short-term use is typically safe and effective.',
            author: '507f1f77bcf86cd799439011',
            date: '2024-10-18',
            readTimeMinutes: 6,
            tableOfContents: [
                { id: 'intro', label: 'What is Eczema?', level: 1 },
                { id: 'moisturizing', label: 'The Importance of Moisturizing', level: 2 },
                { id: 'triggers', label: 'Identifying Triggers', level: 2 },
            ],
            faqs: [
                { question: 'Is eczema contagious?', answer: 'No, eczema is not contagious. It is an inflammatory skin condition, not an infection.' },
                { question: 'Can diet affect eczema?', answer: 'For some people, certain foods can trigger eczema flares. Common culprits include dairy, eggs, and nuts.' },
            ],
            status: 'published',
            createdAt: '2026-07-06T14:56:22.715Z',
            updatedAt: '2026-07-06T14:57:09.234Z',
        },
        {
            id: 'c8d4e5f6a7b8c9d0e1f2a3b4',
            title: 'Understanding Laser Hair Removal',
            excerpt:
                'Everything you need to know about laser hair removal: how it works, effectiveness, and aftercare tips.',
            category: 'Skin & Beauty',
            coverImageUrl:
                'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
            content:
                'Laser hair removal is one of the most popular cosmetic procedures worldwide, offering a long-term solution to unwanted hair. The procedure uses concentrated light energy to target and destroy hair follicles, preventing future growth.\n\nThe treatment works best on dark, coarse hair against lighter skin tones, though advances in technology have made it effective for a wider range of skin types. Multiple sessions are typically needed because hair grows in cycles and the laser only affects follicles in the active growth phase.\n\nMost patients require 6-8 sessions spaced 4-6 weeks apart for optimal results. Each session lasts between 15 minutes to an hour depending on the treatment area size. The sensation is often described as a rubber band snapping against the skin.\n\nAfter treatment, you may experience temporary redness and swelling. Avoid sun exposure, hot showers, and strenuous exercise for 24-48 hours post-treatment. Shaving is permitted between sessions, but avoid waxing or plucking.',
            author: '507f1f77bcf86cd799439011',
            date: '2024-10-12',
            readTimeMinutes: 7,
            tableOfContents: [
                { id: 'how-it-works', label: 'How Laser Hair Removal Works', level: 1 },
                { id: 'candidates', label: 'Who Is a Good Candidate?', level: 2 },
                { id: 'aftercare', label: 'Aftercare Tips', level: 2 },
            ],
            faqs: [
                { question: 'Is laser hair removal permanent?', answer: 'Laser hair removal significantly reduces hair growth, but some hair may eventually regrow. Maintenance sessions once or twice a year can keep results.' },
                { question: 'Does it hurt?', answer: 'Most patients experience mild discomfort, often described as a rubber band snap. Modern lasers include cooling technology to minimize pain.' },
            ],
            status: 'published',
            createdAt: '2026-07-06T14:56:22.715Z',
            updatedAt: '2026-07-06T14:57:09.234Z',
        },
        {
            id: 'd9e0f1a2b3c4d5e6f7a8b9c0',
            title: 'Preparing for Your First Dermatology Visit',
            excerpt:
                'A step-by-step guide on what to expect during your first dermatology appointment and how to prepare.',
            category: 'Patient Guides',
            coverImageUrl:
                'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
            content:
                'Your first visit to a dermatologist can feel intimidating, but proper preparation will help you get the most out of your appointment. Here is everything you need to know.\n\nBefore your appointment, gather your medical history including any skin conditions, allergies, and current medications. Make a list of specific concerns or questions you want to address. If you have a skin issue, take photos of how it looks on different days to show your doctor.\n\nDuring the visit, your dermatologist will review your medical history, perform a visual examination of your skin, and may use a dermatoscope — a special magnifying tool — to examine areas of concern. Be prepared to discuss your skincare routine, sun exposure habits, and any family history of skin cancer.\n\nAfter the examination, your doctor will discuss findings and recommend a treatment plan. This may include prescriptions, procedures, or lifestyle changes. Do not hesitate to ask questions about costs, side effects, and expected outcomes.',
            author: '507f1f77bcf86cd799439011',
            date: '2024-10-05',
            readTimeMinutes: 5,
            tableOfContents: [
                { id: 'preparation', label: 'How to Prepare', level: 1 },
                { id: 'during', label: 'What Happens During the Visit', level: 2 },
                { id: 'after', label: 'After the Appointment', level: 2 },
            ],
            faqs: [
                { question: 'How long does a first visit take?', answer: 'Plan for about 30-60 minutes for your initial consultation.' },
                { question: 'Should I wear makeup?', answer: 'It is best to arrive with a clean face, free of makeup and skincare products.' },
            ],
            status: 'published',
            createdAt: '2026-07-06T14:56:22.715Z',
            updatedAt: '2026-07-06T14:57:09.234Z',
        },
        {
            id: 'e0f1a2b3c4d5e6f7a8b9c0d1',
            title: 'Clinic News: New Laser Equipment Arrives',
            excerpt:
                'We are excited to announce the arrival of state-of-the-art laser equipment for enhanced treatment options.',
            category: 'Clinic News',
            coverImageUrl:
                'https://res.cloudinary.com/dld2gvnf2/image/upload/v1783349784/blog_covers/z1ws7pjtljkr8rhpoltz.png',
            content:
                'We are thrilled to share that MediCare Clinic has invested in the latest generation of laser technology for dermatological treatments. This new equipment represents a significant advancement in our ability to provide safe, effective, and comfortable treatments for our patients.\n\nThe new system features enhanced cooling technology for reduced discomfort during procedures, faster treatment times, and improved results for a wider range of skin types. It will be used for laser hair removal, scar revision, pigmentation treatment, and skin rejuvenation.\n\nOur team has completed extensive training on the new equipment, and we are now accepting bookings for treatments. Existing patients with ongoing treatment plans will be transitioned to the new system at no additional cost.\n\nStay tuned for more updates as we continue to invest in the best technology and training to serve our community.',
            author: '507f1f77bcf86cd799439011',
            date: '2024-09-28',
            readTimeMinutes: 4,
            tableOfContents: [
                { id: 'announcement', label: 'Announcement', level: 1 },
                { id: 'technology', label: 'New Technology Features', level: 2 },
                { id: 'bookings', label: 'How to Book', level: 2 },
            ],
            faqs: [],
            status: 'published',
            createdAt: '2026-07-06T14:56:22.715Z',
            updatedAt: '2026-07-06T14:57:09.234Z',
        },
    ];

    addBlogPost(data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog {
        const newPost: Blog = {
            ...data,
            id: Math.random().toString(36).substring(2, 15),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.blogPosts.unshift(newPost);
        return newPost;
    }

    updateBlogPost(id: string, data: Partial<Blog>): Blog | null {
        const index = this.blogPosts.findIndex((p) => p.id === id);
        if (index === -1) return null;
        this.blogPosts[index] = {
            ...this.blogPosts[index],
            ...data,
            id: id,
            updatedAt: new Date().toISOString(),
        };
        return this.blogPosts[index];
    }

    deleteBlogPost(id: string): void {
        this.blogPosts = this.blogPosts.filter((p) => p.id !== id);
    }

    results: ResultItem[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

    appointments: Appointment[] = [
        {
            id: 1,
            patientName: 'Ahmed Mohamed',
            phone: '01234567890',
            date: '2026-07-13',
            time: '10:00',
            reason: 'Acne treatment consultation',
            status: 'pending',
        },
        {
            id: 2,
            patientName: 'Sara Ali',
            phone: '01123456789',
            date: '2026-07-13',
            time: '11:30',
            reason: 'Skin rash checkup',
            status: 'pending',
        },
        {
            id: 3,
            patientName: 'Omar Hassan',
            phone: '01098765432',
            date: '2026-07-13',
            time: '14:00',
            reason: 'Laser hair removal',
            status: 'approved',
        },
        {
            id: 4,
            patientName: 'Nour Khaled',
            phone: '01555555555',
            date: '2026-07-13',
            time: '09:00',
            reason: 'General consultation',
            status: 'approved',
        },
        {
            id: 6,
            patientName: 'Mariam Adel',
            phone: '01234560000',
            date: '2026-07-13',
            time: '10:30',
            reason: 'Acne scar revision',
            status: 'approved',
        },
        {
            id: 7,
            patientName: 'Hassan Youssef',
            phone: '01122223333',
            date: '2026-07-13',
            time: '12:00',
            reason: 'Skin cancer screening',
            status: 'approved',
        },
        {
            id: 8,
            patientName: 'Laila Mahmoud',
            phone: '01011112222',
            date: '2026-07-12',
            time: '09:00',
            reason: 'General consultation',
            status: 'approved',
        },
        {
            id: 5,
            patientName: 'Youssef Ibrahim',
            phone: '01211111111',
            date: '2026-07-12',
            time: '15:30',
            reason: 'Botox follow-up',
            status: 'rejected',
        },
    ];

    private nextAppointmentId = 9;

    addAppointment(data: Omit<Appointment, 'id'>): Appointment {
        const appointment: Appointment = { id: this.nextAppointmentId++, ...data };
        this.appointments.unshift(appointment);
        return appointment;
    }

    queueEntries: QueueEntry[] = [
        { id: '1', patientName: 'Mona Said', time: '09:00', stage: 'completed' },
        { id: '2', patientName: 'Ali Reda', time: '09:30', stage: 'completed' },
        { id: '3', patientName: 'Heba Mostafa', time: '10:00', stage: 'in_consultation' },
        { id: '4', patientName: 'Khaled Samir', time: '10:30', stage: 'waiting' },
        { id: '5', patientName: 'Dina Adel', time: '11:00', stage: 'waiting' },
    ];

    getLiveQueue() {
        return this.queueEntries.filter((q) => q.stage !== 'completed');
    }

    checkInAppointment(patientName: string) {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const entry: QueueEntry = {
            id: Math.random().toString(36).substring(2, 15),
            patientName,
            time,
            stage: 'waiting',
        };
        this.queueEntries.unshift(entry);
        return entry;
    }

    updateQueueStage(id: string, stage: 'waiting' | 'in_consultation' | 'completed') {
        const entry = this.queueEntries.find((q) => q.id === id);
        if (entry) entry.stage = stage;
        return entry;
    }

    name = 'Hurghada Dental Clinic';
    specialization = 'Advanced Dentistry and Orthodontics';
    address = '123 Al-Kawthar street, Hurghada, Red Sea Governorate';
    phone = '01012345678';
    consultationFee = 500;
    instapayLink = 'https://ipn.eg/S/abdelrahmanashraf5515/instapay/56v0E0';
    walletNumber = '01012345678';
    credentials: string[] = [
        'Licensed by the Egyptian Ministry of Health',
        'ISO 9001 Certified for Healthcare Quality',
        'Voted Best Specialized Clinic in 2025',
    ];

    dayLabels: Record<string, string> = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
    };

    fullDayLabels: Record<string, string> = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
    };

    socialMediaMapper: Record<string, string> = {
        facebook: 'faBrandFacebook',
        instagram: 'faBrandInstagram',
        twitter: 'faBrandTwitter',
        linkedin: 'faBrandLinkedin',
    };

    socialMedia: Record<string, { link?: string } | null> = {
        facebook: { link: 'https://facebook.com/nexushealth' },
        instagram: { link: 'https://instagram.com/nexushealth' },
        twitter: null,
        linkedin: null,
    };

    workingHours: Record<string, { start: string; end: string } | null> = {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: null,
        saturday: { start: '10:00', end: '14:00' },
        sunday: { start: '09:00', end: '17:00' },
    };

    get workingHoursList() {
        return Object.entries(this.workingHours).map(([key, val]) => ({
            key,
            label: this.dayLabels[key] || key,
            hours: val ? `${val.start} - ${val.end}` : null,
        }));
    }
}
