import { UIElement } from 'ziko/dom'
import { UICollapsible } from '../collapsible/main.js'

class UIAccordion extends UIElement{
    constructor({autoClose = false}={},...Collapsible){
        super({element : 'div', name : 'accordion'})
        Object.assign(this.cache,{
            autoClose
        })
        this.append(...Collapsible)
    }
    expandAll(){
        this.items.forEach(n=>n.expand())
        return this;
    }
    collapseAll(){
        this.items.forEach(n=>n.collapse())
        return this;
    }
}

const Accordion = (...Collapsible) => {
    if(Collapsible[0] instanceof UICollapsible) return new UIAccordion({},...Collapsible);
    return new UIAccordion(...Collapsible)
}
export{
    UIAccordion,
    Accordion
}