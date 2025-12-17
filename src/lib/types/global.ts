export type Filter = {
    id: 'aiml' | 'experience' | 'research' | 'labs';
    label: string;
    order?: number;
};

export type Tag = {
    group: string;
    label: string;
    color: string;
};

export type LinkIcon = {
    src: string;
    alt: string;
    href: string;
    target?: string;
    download?: string;
    prefetchRoute?: boolean;
}

export type Project = {
    id: string;
    title: string;
    tags: Tag[];
    filterIds: Array<Filter['id']>;    
    summaryShort: string;
    summaryLong: string;
    year: string;
    links?: LinkIcon[];
    readTime?: 2 | 5 | 10 | 15 | 30;
    isFeature?: boolean;
    imageUrl?: string;
    role?: string;
    employer?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    sections: any[];
};

    




