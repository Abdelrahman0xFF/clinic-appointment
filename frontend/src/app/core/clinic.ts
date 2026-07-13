import { Injectable } from '@angular/core';

export interface NavLink {
    href: string;
    label: string;
    fragment?: string;
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
    status: 'pending' | 'approved' | 'rejected';
}

export interface QueueEntry {
    id: number;
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

    queueEntries: QueueEntry[] = [
        { id: 1, patientName: 'Mona Said', time: '09:00', stage: 'completed' },
        { id: 2, patientName: 'Ali Reda', time: '09:30', stage: 'completed' },
        { id: 3, patientName: 'Heba Mostafa', time: '10:00', stage: 'in_consultation' },
        { id: 4, patientName: 'Khaled Samir', time: '10:30', stage: 'waiting' },
        { id: 5, patientName: 'Dina Adel', time: '11:00', stage: 'waiting' },
    ];

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
