import { tags, UIElement, callWithOptionalProps } from "ziko/dom";
const { div } = tags;

export class UIPrintPageBreak extends UIElement {
    constructor({
        after = "page",
        before,
        inside,
    } = {}) {
        super({ element: "div" });

        this.style({
            breakAfter: after,
            breakBefore: before,
            breakInside: inside,

            // Legacy support
            pageBreakAfter: after === "page" ? "always" : after,
            pageBreakBefore: before === "page" ? "always" : before,
            pageBreakInside: inside,
        });

        this.setAttr({
            "aria-hidden": "true",
            role: "presentation"
        });
    }
}

export const PrintPageBreak = callWithOptionalProps(UIPrintPageBreak)