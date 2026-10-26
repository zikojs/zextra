import {UIElement} from 'ziko'
class ZikoUITreeView extends UIElement{
    constructor({displayNumbering, expandAll},...TreeItems){
        super({element : 'ul',name : 'tree-view'})
        Object.assign(this.cache,{
            displayNumbering,
            expandAll
        })
        this.setAttr({
            role : 'tree',
            tabindex : 0
        })
        this.style({
            listStyle : 'none',
            paddingLeft : '1.2em',
            margin : 0,
            overflow : 'auto',
        })
        this.append(...TreeItems)
        this.updateNumbering()
    }
    isTreeView(){
        return true;
    }
    updateNumbering() {   
        if(this.cache.displayNumbering){
            function processItems(items, currentPath = []) {
            items.forEach((item, index) => {
                if (!item.isTreeItem) return;
                const newPath = [...currentPath, index + 1];
                const numberingString = newPath.join('.');
                Object.assign(item.cache, { numbering: `${numberingString}.\u00A0` });  
                item.numbering.element.textContent = item.cache?.numbering; // Find Other Way           
                if (item.items && item.items.length > 0) {
                    processItems(item.items, newPath);
                }
            });
        }
        processItems(this.items);
        } 
        return this;
    }   
}

const TreeView = ({displayNumbering = true}={},...TreeItems) => new ZikoUITreeView({displayNumbering},...TreeItems);

export{
    ZikoUITreeView,
    TreeView
}