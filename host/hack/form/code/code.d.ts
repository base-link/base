import { DeckForm } from './deck';
export type CodeForm = {
    load: (take: TakeCodeLoadForm) => void;
    make: () => void;
};
export type TakeCodeForm = {
    deck: DeckForm;
};
export type TakeCodeLoadForm = {
    file: string;
};
