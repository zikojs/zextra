// import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/dom";


export declare class UIFloatingPanel extends UIElement{}

export declare function FloatingPanel(
    props?: {
        element? : UIElement | HTMLElement | string,
        title? : String,
        i18n? : {
            reduceBtn : String,
            extendBtn : String,
            restoreSizeBtn : String,
            closeBtn : String
        }
    },
    ...items : UIElement[] 
) : UIFloatingPanel

export declare function FloatingPanel(...items : UIElement[] ) : UIFloatingPanel
