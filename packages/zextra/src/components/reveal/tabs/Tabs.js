import { UIElement } from "ziko/dom";
class UITabs extends UIElement{
    constructor(Controller, Panel, {orientation = 'vertical'} = {}){
        super({element : 'div', name : 'zextra_tabs'});
        this.controller = Controller;
        this.pannel = Panel;
        this.style({
            display : 'flex',
            flexDirection : 'column',
            border : '1px solid #ccc'
        });
        this.append(
            this.controller, 
            this.pannel
        )     
        Object.assign(this.cache,{
            orientation,
            active_index : null
        })
        this.setup();
    }
    updateOrientation(orientation = this.cache.orientation){
        if(orientation !== this.cache.orientation){
            this.cache.orientation = orientation;
            if(this.cache.orientation === 'vertical'){
                this.style({ flexDirection : 'row' });
                this.controller.style({ flexDirection : 'column' });
            }
            else {
                this.style({ flexDirection : 'column' })
                this.controller.style({ flexDirection : 'row' })
            }
            this.updateSliderOrientation()
        }
        return this;
    }
    updateSliderOrientation(){
        const {offsetTop, offsetHeight, offsetLeft, offsetWidth} = this.activeTab.element
        if(this.cache.orientation === 'vertical'){
            this.controller.slider.style({
                width : '3px',
                height : `${offsetHeight}px`,
                left : `${offsetWidth}px`,
                top : `${offsetTop}px`,
            })
        }
        else this.controller.slider.style({
                width : `${offsetWidth}px`,
                height : '3px',      
                left : `${offsetLeft}px`,
                top : '',
                bottom : '0'
            }) 
    }
    setup(){
        this.tabs.forEach((tab, i) => {
            tab.onClick(() => this.activate(i));
        });
        this.updateOrientation()
        this.activate(0)
    }
    get tabs(){
        return this.controller.items
    }
    get length(){
        return this.controller.items.length
    }
    get activeIndex(){
        return this.cache.active_index
    }
    get activeTab(){
        return this.cache.active_tab
    }
    get activePanel(){
        return this.cache.active_panel
    }
    activate(index){
        if(this.activeIndex === index) return this;
        Object.assign(this.cache,{
            active_index : index,
            active_tab : this.tabs[index],
            active_panel : this.pannel[index]
        })
        this.pannel.forEach(n=>n.style({display : 'none'}))
        this.pannel[index].style({display : 'block'})
        this.updateSliderOrientation()
    }
    next(n = 1){
        this.activate((this.activeIndex + n) % this.length);
        return this;
    }
    previous(n = 1){
        this.activate((this.activeIndex - n) % this.length);
        return this;
    }
}

const Tabs = (Controller, Pannel, {orientation = 'vertical'} = {}) => new UITabs(Controller, Pannel, {orientation})
export{
    UITabs, 
    Tabs
}