import {tags, UIElement, call_with_optional_props} from 'ziko/dom'

const { div } = tags;

export class UISkeleton extends UIElement{
    constructor({
        variant = 'text', 
        animation = 'pulse', 
        color = 'rgba(255, 255, 255, 0.13)'
    } = {}){
        super({element : 'div'})
        this.config = {
            variant,
            animation,
            color
        }

        this.setup()
    }

    setup(){
        const {variant, animation, height} = this.config;
        const classes = [
            "skeleton",
            `skeleton--${variant}`,
            animation ? `skeleton--${animation}` : ""
        ].filter(Boolean).join(" ");

        this.setAttr({class : classes})
    }
}

export const Skeleton = call_with_optional_props(UISkeleton);