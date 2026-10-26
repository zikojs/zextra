import { UIElement, tags } from "ziko"
class ZikoUITreeItem extends UIElement{
    constructor({label = '', opened = false, href } = {}, ...items){
        super({element : 'li', name : 'tree-item'})
        Object.assign(this.cache,{
            isOpened : opened,
        })
        this.style({
            userSelect : 'none',
            lineHeight : '1.5'
        })
        this.setAttr({
            role : 'treeitem',
            tabindex : -1
        })
        this.arrow = tags.span('').style({
            display: 'inline-block',
            width: '1.2em',
            textAlign: 'center',
            fontWeight: 'bold',
            marginRight: '6px',
            transition: 'transform 0.15s ease'
        })
        this.label = href ? tags.a({href, target : href.startsWith('#') ? '': '_blank'}, label) :  tags.span(label);
        this.numbering = tags.span({}, '')
        this.label_container = tags.div(
            this.arrow, 
            this.numbering,
            this.label,
        ).style({
            display:'flex',
            alignItems: 'center',
            padding:'3px 6px',
            borderRadius: '4px',
            cursor: 'pointer'     
        }).setAttr({
            tabindex : 0,
            ariaLabel : label,
            role : 'presentation'
        })       
        this.items_container = tags.ul().style({
            listStyle: 'none',
            paddingLeft: '1.2em',
            margin: '0'            
        }).setAttr("role", "group")
        if(items.length > 0) this.items_container.append(...items);
        this.append(
            this.label_container,
            this.items_container
        )   
        this.#maintain()
        this.label_container.onPtrDown((e)=>{
            e.event.stopPropagation();        
            this.cache.isOpened = !this.cache.isOpened   
            this.#maintain()   
        })
        this.label_container.onKeyDown(e=>{
            if(e.kd === "Enter") this.toggle()
        })
        this.items = this.items_container.items;   
    }
    #maintain(){
        this.setAttr("aria-expanded", this.isOpened());
        if(this.hasItems()){
            this.arrow.element.textContent = this.isOpened() ? "-" : "+";
            this.items_container.style({
                display : this.isOpened() ? 'block' : 'none'
            })
        }
        else this.arrow.element.textContent = ''
        // this.numbering.element.textContent = this.cache.numbering;
    }
    isTreeItem(){
        return true
    }
    toggle(){
        this.cache.isOpened = !this.cache.isOpened;
        this.#maintain()
        return this;
    }
    get parent(){
        // To Check
        return super.parent.parent
    }
    isOpened(){
        return this.cache.isOpened;
    }
    hasItems(){
        return this.items_container?.items.length > 0
    }
}

const TreeItem = ({label, href, opened} = {}, ...items) => new ZikoUITreeItem({label, href, opened}, ...items);
export{
    ZikoUITreeItem,
    TreeItem
}
