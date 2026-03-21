import { UIElement } from "ziko/dom";

class UISlide extends UIElement {
    constructor({ appear = true, direction = 'top', ease_in = 'ease-in-out', ease_out = 'ease-in-out', t_in = '300ms', t_out = '300ms', distance = '100%' } = {}, content) {
        super({ element: 'div', name: 'slide' });
        Object.assign(this.cache, { appear, direction, ease_in, ease_out, t_in, t_out, distance });
        this.append(content);
        this.style({ transform: get_transform(direction, distance), display: 'none' });
        if (appear) this.slideIn();
    }
    slideIn(t = this.cache.t_in, ease = this.cache.ease_in) {
        if (typeof t === 'number') t += 'ms';
        this.element.style.display = 'block';
        this.style({ transform: get_transform(this.cache.direction, this.cache.distance) });
        void this.element.offsetWidth; // force reflow
        this.style({ 
            transform: 'translate(0,0)',
            transition: `transform ${t} ${ease}`
        });
        return this;
    }
    slideOut(t = this.cache.t_out, ease = this.cache.ease_out) {
        if (typeof t === 'number') t += 'ms';
        const element = this.element;
        this.style({ 
            transform: get_transform(this.cache.direction, this.cache.distance),
            transition: `transform ${t} ${ease}`
        });

        this.element.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === 'transform') {
                element.style.display = 'none';
                element.removeEventListener("transitionend", handler);
            }
        });

        return this;
    }
}

function get_transform(direction, distance) {
        switch (direction) {
            case 'left': return `translateX(-${distance})`;
            case 'right': return `translateX(${distance})`;
            case 'top': return `translateY(-${distance})`;
            case 'bottom': return `translateY(${distance})`;
            default: return `translateX(-${distance})`;
        }
    }

const Slide = ({ appear, direction }, content) => new UISlide({ appear, direction }, content);

export {
    UISlide,
    Slide
};
