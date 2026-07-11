import { UIElement } from "ziko/dom";
import type { Variants } from '../shared/variants.ts'

declare class UIButton extends UIElement {}

export declare const Button: (props : {
    text?: string,
    variant: Variants,
    color?: string,
}) => UIButton;

