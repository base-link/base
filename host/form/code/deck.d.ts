export type DeckBaseForm = {
    new (take: TakeDeckForm): DeckForm;
    link: (take: TakeDeckLinkForm) => void;
    save: (take: TakeDeckLinkForm) => void;
    test: (take: TakeDeckLinkForm) => void;
    toss: (take: TakeDeckLinkForm) => void;
};
export type DeckForm = {
    find: (take: TakeDeckFileForm) => void;
    link: (take: TakeDeckLinkForm) => void;
    load: () => void;
    save: (take: TakeDeckLinkForm) => void;
    test: (take: TakeDeckLinkForm) => void;
    toss: (take: TakeDeckLinkForm) => void;
};
export type TakeDeckFileForm = {
    base?: string;
    file: string;
};
export type TakeDeckForm = {
    home: string;
};
export type TakeDeckLinkForm = {
    link: string;
    mark?: string;
    site?: string;
};
export declare function needDeckBaseForm<T extends DeckBaseForm>(base: T): T;
