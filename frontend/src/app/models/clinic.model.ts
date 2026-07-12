export interface WorkingHours {
  start: string;
  end: string;
}

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

export interface SocialMediaItem {
  link?: string;
}
