import { UIElement, tags } from "ziko/dom";
import './index.css'

class UIBreadcrumbs extends UIElement{
    constructor(...items){
        super({ element : 'nav', name : 'breadcrumbs' })
        this.list = tags.ul().setAttr({ class : 'zextra-breadcrumbs' })
        this.setAttr({
            'aria-label' : 'Breadcrumb'
        })
        this.append(this.list)
        this.add(...items)
        for(let i=0; i<items.length - 1; i++){
            this.list.items[i].element.after(tags.span('/').element)
        }
    }
    add(...items){
        this.list.append(...items.map(item => tags.li({}, item)))
        return this;
    }
    addItem(item){
        
    }
    addSeparator(){

    }
}

const Breadcrumbs = (...items) => new UIBreadcrumbs(...items)
export{
    UIBreadcrumbs,
    Breadcrumbs
}