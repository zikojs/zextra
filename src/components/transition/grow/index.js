import { UIElement } from "ziko/dom";

class UIGrow extends UIElement {
    constructor({ appear = true, ease_in = 'ease-in-out', ease_out = 'ease-in-out', t_in = '300ms', t_out = '300ms', start_scale = 0, end_scale = 1 } = {}, content) {
        super({ element: 'div', name: 'grow' });
        this.append(content);
        this.style({ 
            opacity: 0, 
            transform: `scale(${start_scale})`, 
            display: 'none' 
        });
        Object.assign(this.cache, {
            ease_in,
            ease_out,
            t_in,
            t_out,
            start_scale,
            end_scale
        });

        if (appear) this.growIn();

    }

    growIn(t = this.cache.t_in, ease = this.cache.ease_in) {
        console.log('In')
        if (typeof t === 'number') t += 'ms';
        this.element.style.display = 'block';
        this.style({ opacity: 0, transform: `scale(${this.cache.start_scale})` });
        void this.element.offsetWidth; // force reflow
        this.style({ 
            opacity: 1, 
            transform: `scale(${this.cache.end_scale})`,
            transition: `opacity ${t} ${ease}, transform ${t} ${ease}`
        });
        return this;
    }

    growOut(t = this.cache.t_out, ease = this.cache.ease_out) {
        if (typeof t === 'number') t += 'ms';
        const element = this.element;
        this.style({ 
            opacity: 0, 
            transform: `scale(${this.cache.start_scale})`,
            transition: `opacity ${t} ${ease}, transform ${t} ${ease}`
        });

        this.element.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "opacity") {
                element.style.display = 'none';
                element.removeEventListener("transitionend", handler);
            }
        });

        return this;
    }
}

const Grow = ({ appear }, content) => new UIGrow({ appear }, content);

export {
    UIGrow,
    Grow
};
