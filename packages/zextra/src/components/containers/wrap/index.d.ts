import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/src/ui";


export declare class UIWrap extends ZextraUI{}

export declare function Wrap(
    props?: {
        element? : UIElement | HTMLElement | string
    },
    ...items : UIElement[] 
) : UIWrap

export declare function Wrap(...items : UIElement[] ) : UIWrap
