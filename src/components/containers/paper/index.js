import { UIElement } from "ziko/domm";

class UIPaper extends UIElement{
    constructor({elevation, square} = {}, ...items){
        super({ element : 'div', name : 'paper'})
        this.append(...items)
    }
    setElevation(elevation){
        
    }
}

const Paper = ({elevation, square} = {}, ...items) => new UIPaper({elevation, square}, ...items);
export{
    UIPaper,
    Paper
}