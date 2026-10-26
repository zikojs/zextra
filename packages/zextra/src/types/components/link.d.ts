import { UIElement } from "ziko/dom";

declare class UILink extends UIElement {}

export declare const Link: (props?: {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' ;
  color?: string;
  underline?: boolean;
  inline?: boolean;
  icon?: UIElement;
  text?: string | UIElement | HTMLElement;
}) => UILink;
