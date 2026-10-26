import { UIElement } from "ziko/dom";

class UIContent extends UIElement{
    constructor(...items){
        super({ element : 'div', name : 'content'})
        this.append(...items).style({ display : 'contents'})
    }
}

const Content = (...items) => new UIContent( ...items);
export{
    UIContent,
    Content
}