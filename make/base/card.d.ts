declare class BaseCard {
    link: string;
    seed: Object;
    id: number;
    constructor(link: string);
    bind(seed: Object): void;
    free(): void;
}
export { BaseCard };
