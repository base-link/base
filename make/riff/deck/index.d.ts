import { Base } from '../../index.js';
import type { SiteProcessInputType } from '../../index.js';
export * from './deck/index.js';
export declare function handle_deckCard(base: Base, link: string): void;
/**
 * Entrypoint function.
 */
export declare function process_deckCard(base: Base, link: string): void;
export declare function process_deckCard_nestedChildren(input: SiteProcessInputType): void;
export declare function process_deckCard_staticTerm(input: SiteProcessInputType): void;
