export type IFilter = {
    id: 'aiml' | 'experience' | 'research' | 'labs' | '';
    label: string;
    order?: number;
};

export type ITag = {
    group: string;
    label: string;
    color: string;
};

export type ILinkIcon = {
    src: string;
    alt: string;
    href: string;
    target?: string;
    download?: string;
    prefetchRoute?: boolean;
}

export type IProject = {
    pid: string;
    title: string;
    tags: ITag[];
    filterIds: Array<IFilter['id']>;    
    summaryShort: string;
    summaryLong: string;
    year: string;
    links?: ILinkIcon[];
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

    




