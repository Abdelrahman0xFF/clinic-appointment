export interface SocialMediaEntry {
    platform: string;
    link: string;
}

export interface WorkingHoursEntry {
    start: string;
    end: string;
}

export interface ClinicDto {
    id: string;
    name: string;
    specialization: string;
    address: string;
    phone: string;
    consultationFee: number;
    instapayLink: string;
    walletNumber: string;
    credentials: string[];
    socialMedia: Record<string, SocialMediaEntry | null>;
    workingHours: Record<string, WorkingHoursEntry | null>;
    createdAt: string;
    updatedAt: string;
}

export interface WorkingHoursDisplay {
    key: string;
    label: string;
    hours: string | null;
}
