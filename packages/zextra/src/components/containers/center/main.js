import { UIElement } from "ziko/dom";
import { ZextraUI } from "../../../constructor/zextra-ui.js";

class UICenter extends ZextraUI{
    constructor(...items){
        super({ element : 'div', name : 'center'})
        this.append(...items).setAttr({class : 'zextra-center'}).style({ 
            border : '2px dotted darkblue'
        })
    }
}

const Center = (...items) => new UICenter( ...items);
export{
    UICenter,
    Center
}