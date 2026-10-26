import {tags, UIElement, call_with_optional_props} from 'ziko/dom'

const { div } = tags;

export class UIIndicator extends UIElement{
    constructor(){
        super({ element : 'div'})
    }

}

export const indicator = call_with_optional_props(UIIndicator)