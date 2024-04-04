export interface Event {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    subtitle: string;
    primaryColor: string;
    banner: string;
    dateUTC: string;
    speakers: EventSpeaker[];
    sponsors: EventSponsor[];
    moderators: EventModerator[];
    slug: string;
    arenaId: string;
    streamId: string;
    live: boolean;
    isPast: boolean;
    isImage: boolean;
}

export interface EventSpeaker {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    speaker: Speaker;
}

export interface EventModerator {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    moderator: Moderator;
}

export interface EventSponsor {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sponsor: Sponsor;
}

export interface Speaker {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    picture: string;
    video?: string;
    description: string;
    bio: string;
}

export interface Moderator {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    picture: string;
    video?: string;
    description: string;
    bio: string;
}

export interface Sponsor {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    logo?: string;
}
