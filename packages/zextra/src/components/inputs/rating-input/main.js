import { UIElement, tags } from "ziko/dom";
import { useState } from "ziko/hooks";
import { clamp } from "ziko/math";
// import Heart from "ziko-lucide/heart" 
// import Star from "ziko-lucide/star" 

class UIRatingInput extends UIElement{
    constructor(...icons){
        super({element : 'div', name : 'rating_input'})
        const [currentValue, updateValue, controller] = useState('0')
        this.controller = controller
        Object.assign(this.cache, {
            state : {
                current : currentValue, 
                update : updateValue
            }, 
            disabled : false,
            min : 0, 
            max : 5
        })
        this.setAttr({
            role : 'radiogroup',
            'aria-label' : 'Rating',
            tabindex : '0',
            'aria-valuemin' : '0',
            'aria-valuemax' : '5',
            'aria-valuenow' : currentValue,
        })
        this.add(...icons)
        this.icons.forEach((n, i)=> {
            n.onPtrEnter(()=>{
                update_viusal(this.icons, i+1)
                this.cache.state.update(String(i+1));
                this.icons[i].style({
                    transform : 'scale(1.2)'
                })
            })
            n.onPtrLeave(()=>{
                update_viusal(this.icons, this.value);
                this.icons[i].style({
                    transform : ''
                })
            })
            let clickTimeout;
            n.onClick(() => {
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    this.cache.state.update(String(i+1));
                    this.emit('value-changed', { value : this.value })
                }, 250);
            })
            n.onDblClick(() => {
                this.cache.state.update(String(i));
                this.emit('value-changed', { value : this.value })   
                clearTimeout(clickTimeout);
            })
        })
    }
    get icons(){
        return this.items.map(n => n.items[0])
    }
    get value(){
        return +this.cache.state.current().value
    }
    get current_state(){
        return this.cache.state.current
    }
    get min(){
        return this.cache.min;
    }
    get max(){
        return this.cache.max;
    }
    add(...icons){
        this.append(...icons.map(icon => icon_wrapper(icon)))
    }
    onChange(callback){
        this.on('value-changed', e=> callback(e.detail.value))
    }
    disable(){

    }
    enable(){

    }
    setValue(value){
      this.cache.state.update(clamp(value, this.min, this.max));
      update_viusal(this.icons, this.value);  
      return this;
    }
    increment(n = 1){
        this.cache.state.update(this.value + n);
        update_viusal(this.icons, this.value);
        return this;
    }
    decrement(n = 1){
        this.cache.state.update(this.value - n)
        update_viusal(this.icons, this.value)
    }
}

const icon_wrapper = (icon) => tags.span({}, icon).setAttr({
    role : 'radio',
    'aria-checked' : false,
    tabindex : '-1',
    'data-value': null,
    'aria-label': null
}).style({ cursor : 'pointer' })

const update_viusal=(icons, count)=>{
    icons.forEach((icon, index)=>{
        icon.style({
            fill : index < count ? '#e63946' : '#777'
        })
        icon.setAttr({
            'aria-checked' : index < count ? true : false
        })
    })
}

const RatingInput = (...icons) => new UIRatingInput(...icons)
export{
    UIRatingInput,
    RatingInput
}