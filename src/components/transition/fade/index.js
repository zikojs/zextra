import { UIElement } from "ziko/domm";

class UIFade extends UIElement {
    constructor({ appear = true, ease_in = 'ease-in-out', ease_out = 'ease-in-out', t_in = '300ms', t_out = '300ms'} = {}, content) {
        super({ element: 'div', name: 'fade' });
        Object.assign(this.cache,{
            ease_in,
            ease_out,
            t_in,
            t_out
        })
        this.append(content);
        this.style({ opacity: 0, display: 'none' });
        if(appear) this.fadeIn();
    }
    fadeIn(t = this.cache.t_in, ease = this.cache.ease_in) {
        if(typeof t === 'number') t+='ms'
        this.element.style.display = 'block';
        this.style({ opacity: 0 }); 
        void this.element.offsetWidth;
        this.style({ 
            opacity: 1,
            transition : `opacity ${t} ${ease}`
        });
        return this;
    }
    fadeOut(t = this.cache.t_out, ease = this.cache.ease_out) {
        if(typeof t === 'number') t+='ms'
        const element = this.element;
        this.style({ 
            opacity: 0,
            transition : `opacity ${t} ${ease}`
        });
        this.element.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "opacity") {
                element.style.display = 'none';
                element.removeEventListener("transitionend", handler);
                onFinish?.();
            }
        });
        return this;
    }
}

const Fade = ({ appear }, content) => new UIFade({ appear }, content);

export {
    UIFade,
    Fade
}
