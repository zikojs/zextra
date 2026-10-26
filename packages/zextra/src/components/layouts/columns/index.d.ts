import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/src/ui";

// type Optional<T> = {
//     [P in keyof T]?: T[P];
// };

export declare class UIColumns extends ZextraUI{}

export declare function Columns(
    props?: {
        gap? : number | string,
        element? : UIElement | HTMLElement | string
    },
    ...items : UIElement[] 
) : UIColumns

export declare function Columns(...items : UIElement[] ) : UIColumns
