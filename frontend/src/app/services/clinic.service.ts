import { Injectable } from '@angular/core';
import type { NavLink, Service, BlogPost, ResultItem } from '../models/clinic.model';

@Injectable({ providedIn: 'root' })
export class ClinicService {
    navLinks: NavLink[] = [
        { href: '/', label: 'Home', fragment: 'hero' },
        { href: '/', label: 'About', fragment: 'about' },
        { href: '/', label: 'Services', fragment: 'services' },
        { href: '/', label: 'Blog', fragment: 'blog' },
        { href: '/', label: 'Visit', fragment: 'visit' },
    ];

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

    results: ResultItem[] = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ];

    address = '123 Al-Kawthar street, Hurghada, Red Sea Governorate';
    phone = '01123593773';

    dayLabels: Record<string, string> = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
    };

    socialMediaMapper: Record<string, string> = {
        facebook: 'faBrandFacebook',
        instagram: 'faBrandInstagram',
        twitter: 'faBrandTwitter',
        linkedin: 'faBrandLinkedin',
    };

    socialMedia: Record<string, { link?: string } | null> = {
        facebook: { link: '#' },
        instagram: { link: '#' },
        twitter: null,
        linkedin: { link: '#' },
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
            label: this.dayLabels[key] || key,
            hours: val ? `${val.start} - ${val.end}` : null,
        }));
    }
}
