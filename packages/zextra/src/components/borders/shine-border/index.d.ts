import { UIElement } from "ziko/dom";

declare class UIShineBorder extends UIElement {}

export declare const ShineBorder: (props : {
    shineColor?: string | string[],
    shineLength: number,
},
...items : UIElement[] ) => UIShineBorder;

