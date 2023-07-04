import { RiffDeck, SiteLookFormLink } from '~';
export declare class Base {
    task: Array<() => void>;
    hook: Record<string, Array<SiteLookFormLink>>;
    host: Record<string, unknown>;
    deck: Record<string, RiffDeck>;
    constructor();
}
