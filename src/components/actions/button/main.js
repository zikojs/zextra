// Variant : text contained outlined
// Color : primary secondary .. 
// Background : 
// Size : Small Medium Large
// StartIcon 
// EndIcon 

// Text Button => 
import { UIElement } from "ziko/dom";

class UIButton extends UIElement{
    constructor(text, variant, color){
        super({element : 'button', name : 'zextra_button'})
        Object.assign(this.cache, {
            text,
            variant,
            color
        })
        this.style({
            padding : '5px',
            minWidth : '40px',
            cursor : 'pointer'
        })
        this.init()
    }
    get #color(){
        return 'darkblue'
    }
    get #background(){

    }
    init(){
        this.element.innerText = this.cache.text ;
        switch(this.cache.variant){
            case 'contained' : this.style({
                border: 'none',
                color: '#fff',
                background: 'red',
                boxShadow: '0 6px 18px rgba(12,20,40,0.08)'
            })
            break;
            
            case 'outlined' : this.style({
                border : '1px darkblue solid',
                background : 'transparent'
            }); 
            break;

            case 'text' : this.style({
                border : 'none',
                color : this.#color,
                background : 'transparent'
            });
            break;
        }
        return this;
    }
}

const Button = ({text, variant, color} = {}) => new UIButton(text, variant, color)

export{
    UIButton,
    Button
}