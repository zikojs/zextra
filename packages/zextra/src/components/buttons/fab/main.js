import { UIElement } from 'ziko/dom'
import { map } from 'ziko/math/utils'
class UIFab extends UIElement{
    constructor({x = 0, y = 0, text, icon} = {}){
        super({element : 'button', name : 'zextra_fab'})
        this.element.innerText = text
        this.style({
            position : 'absolute'
        })
        this.pos(x, y)
    }
    pos(x, y){
        this.style({
            left : map(x, -1, 1, 0, 100) + '%',
            top : map(y, -1, 1, 100, 0) + '%',
            transformOrigin: 'center center',
            transform: 'translate(-50%, -50%)'
        })
    }
}

const Fab = ({x = 0, y = 0, text, icon}) => new UIFab({x, y, text, icon})
export{
    Fab, 
    UIFab
}