import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/src/ui";


export declare class UIBlockquote extends ZextraUI{}

export declare function Blockquote(
    props: {
        cite : string,
        quote : string | HTMLElement | UIElement
    },
) : UIBlockquote

