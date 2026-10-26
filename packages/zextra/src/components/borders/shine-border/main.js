import { UIElement, tags, call_with_optional_props } from "ziko/dom";

const { div } = tags;

class UIShineBorder extends UIElement{
    constructor({shineColor = [], shineLength = 50}, ...items){
        super({element : 'div'});
        this.setAttr({ class : 'zextra shine-container'});
        this.append(
            div({class : 'zextra shine-content'}, ...items)
        )
        this.config = {
            shineColor,
            shineLength
        }
        this.setup()
    }

    setup(){
        const {shineColor, shineLength} = this.config;
        const colorValue = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor;
        const lengthValue = typeof shineLength === "number" ? `${shineLength}%` : shineLength;

        this.element.style.setProperty('--shine-color', colorValue);
        this.element.style.setProperty('--shine-length', lengthValue);

    }
}

export const ShineBorder = call_with_optional_props(UIShineBorder)