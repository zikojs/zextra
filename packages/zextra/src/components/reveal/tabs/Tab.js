import { UIElement } from "ziko";
class UITab extends UIElement{
    constructor({label = ''} = {}){
        super({element : 'div', name : 'zextra_tab'})
        this.style({
            cursor : 'pointer', 
            userSelect : 'none',
            position : 'relative',
            padding : '10px 20px'
        })
        this.element.innerText = label;
    }
}

const Tab = ({label} = {}) => new UITab({label});
export{
    Tab, 
    UITab
}