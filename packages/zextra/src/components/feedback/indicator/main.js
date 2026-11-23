import {tags, UIElement, callWithOptionalProps} from 'ziko/dom'

const { div } = tags;

export class UIIndicator extends UIElement{
    constructor(){
        super({ element : 'div'})
    }

}

export const indicator = callWithOptionalProps(UIIndicator)