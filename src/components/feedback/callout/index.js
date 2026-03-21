import { UIElement, Flex, tags } from "ziko/dom";

class UICallout extends UIElement{
    constructor({ title = null, color, icon = null, variant} = {}, content ){
        const container = Flex()
        super({element : container.element, name : 'callout'});     
        this.icon = icon;
        this.title = tags.span(title);
        this.content = content;  
        this.content_wrapper = Flex(
            this.title, 
            this.content
        ).vertical()
        this.append(
            this.icon,
            this.content_wrapper.style({
                gap : '4px'
            })
        )
        this.style({
            border : '1px green solid',
            width : '200px',
            gap : '5px',
            padding : '2px',
            boxSizing : 'border-box'
        })
        this.title.style({
                fontSize : '22px',
                fontWeight : 'bold',
        })
    }
}
const Callout = ({icon, title, color} = {}, content ) => {
    console.log(content)
    return new UICallout({icon, title, color}, content)
}

export{
    Callout, 
    UICallout
}
