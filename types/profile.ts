export interface Language {
    name: string;
    icon: string;
    proficiency: number;
    color: string;
}

export interface BiggestProgress {
    language: string;
    improvement: number;
    icon: string;
}

export interface UseProfile {
    username: string;
    avatar: string;
    avatarImage?: string;
    role: string;
    level: number;
    favoriteLanguages: Language[];
    biggestProgress: BiggestProgress;
}

export type ProfileData = UseProfile | undefined