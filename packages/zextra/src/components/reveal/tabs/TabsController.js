import { UIElement, tags } from "ziko";
class UITabsController extends UIElement{
    constructor(...Tab){
        super({element : 'div', name : 'zextra_tabs_controller'})
        this.style({
            display : 'flex',
            position : 'relative'
        })
        this.slider = tags.div().style({
            background : '#007BFF',
            position : 'absolute',
            transition: 'all 0.3s ease',
        })
        this.append(...Tab);
        this.element.append(this.slider.element);
    }
}

const TabsController = (...Tab) => new UITabsController(...Tab)
export{
    TabsController,
    UITabsController
}