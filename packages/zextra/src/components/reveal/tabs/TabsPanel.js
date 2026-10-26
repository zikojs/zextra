import { UIElement } from "ziko";
class UITabsPanel extends UIElement{
    constructor(...items){
        super({element : 'div', name : 'zextra_tabs_panel'})
        this.style({
            flex : '1',
            padding : '20px'
        })
        this.append(...items)
    }
}

const TabsPanel = (...items) => new UITabsPanel(...items)
export {
    UITabsPanel,
    TabsPanel
}