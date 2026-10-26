import { UIElement } from "ziko/dom";

class UIBleed extends UIElement{
    constructor(...items){
        super({ element : 'div', name : 'bleed'})
        this.append(...items)
        this.setAttr({class : 'zextra-bleed'})
        // this.style({
        //     width : 'auto',
        //     marginLeft : 0,
        //     marginRight : 0,
        //     display : 'flex',
        //     alignItems : 'center',
        //     justifyContent : 'center'
        // })
        requestAnimationFrame(()=>{
            const parent = this.element.parentElement;
            if (!parent) return;
            const style = getComputedStyle(parent);
            const paddingLeft = parseFloat(style.paddingLeft) || 0;
            const paddingRight = parseFloat(style.paddingRight) || 0;
            this.style({
                marginLeft : `-${paddingLeft}px`,
                marginRight : `-${paddingRight}px`,
                width : `calc(100% + ${paddingLeft + paddingRight}px)`
            })
        })
    }
}

const Bleed = (...items) => new UIBleed(...items);
export{
    UIBleed,
    Bleed
}