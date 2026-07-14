export interface NavLink {
    href: string;
    label: string;
    fragment?: string;
}

export const DAY_LABELS: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
};

export const FULL_DAY_LABELS: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
};

export const SOCIAL_MEDIA_MAPPER: Record<string, string> = {
    facebook: 'faBrandFacebook',
    instagram: 'faBrandInstagram',
    twitter: 'faBrandTwitter',
    linkedin: 'faBrandLinkedin',
};
