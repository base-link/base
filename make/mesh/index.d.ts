import code from '../index.js';
import { Riff, RiffCard } from '../form/riff.js';
import { SiteFork } from '../code.js';
export type MeshLoad = {
    base: code.Base;
    card: RiffCard;
    fork: SiteFork;
    riff: Riff;
};
export declare function loadCard(base: code.Base, link: string): void;
