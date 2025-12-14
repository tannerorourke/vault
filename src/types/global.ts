export type Filter = {
    id: string;
    label: string;
    order?: number;
};

export type Project = {
    id: string;
    title: string;
    shortDescription?: string;
    longDescription?: string;
    tags: Tag[];
    filterIds?: Filter['id'][];
    year?: string;
    extLinks?: ExtLink[]
    imageUrl?: string;
    readTime?: 2 | 5 | 10 | 15 | 30
    role?: string;
    employer?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
};

    export type Tag = {
        id: string;
        name: string;
        color?: string;
    };

export type ExtLink = {
    id?: string;
    icon: 'github' | 'pdf' | 'demo' | 'mail' | 'linkedin' | 'website';
    // external link, or source path
    url?: string;
}



