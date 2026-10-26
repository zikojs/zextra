import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/src/ui";


export declare class UIScrollArea extends ZextraUI{}

export declare function ScrollArea(
    props?: {
        element? : UIElement | HTMLElement | string
    },
    ...items : UIElement[] 
) : UIScrollArea

export declare function ScrollArea(...items : UIElement[] ) : UIScrollArea
