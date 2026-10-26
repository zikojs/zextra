import { UIElement } from 'ziko/src/ui/index.js';
import { ZextraUI } from '../../../constructor/zextra-ui.js';

export declare class UITableOfContents extends ZextraUI {}

export declare const TableOfContents: (
    props?: {
        content : HTMLElement | UIElement,
        depth : number | number[], 
        labelFn : (heading: HTMLHeadingElement, level: number) => string
    }
) => UITableOfContents;


// depth can be:
// number -> max depth (e.g. 3 => h1,h2,h3)
// array  -> specific levels (e.g. [2,4] => h2,h4)
