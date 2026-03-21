import { UIElement } from "ziko/domm";
import {ArrowUpRight} from 'ziko-lucide/arrowupright'

class UILink extends UIElement{
    constructor({href, target, color, underline, inline, icon} = {}, text){
        super({ element : 'a', name : 'link' })
        this.style({
            display : inline ? 'inline-flex' : 'flex',
            textDecoration : underline ? 'underline' : 'none',
            ...underline && {
                textDecorationSkipInk : 'auto',
                textDecorationThickness : '1.5px',
                textUnderlineOffset : '2px' 
            },
            // padding : '2px',
            justifyContent : 'flex-start',
            alignItems : 'center',
            // fontSize : '24px',
            width : 'fit-content',
            color,
            
        })
        this.setAttr({ href, target })
        this.append(text)
        if(icon) this.append(icon.style({stroke : color}))
    }
}

const Link = ({href = '#', target = '_blank', color = 'darkblue', inline = false, underline = true, icon = ArrowUpRight()} = {}, text) => new UILink({href, target, color, inline, underline, icon}, text)

export{
    UILink, 
    Link
}