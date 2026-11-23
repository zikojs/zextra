import { tags, UIElement } from 'ziko/dom';

class UIButton extends UIElement {
    constructor(text, variant = 'contained', color = 'primary', size = 'medium') {
        super({ 
            element: tags.button(text).element, 
            name: 'zextra_button' 
        });

        Object.assign(this.cache, {
            text,
            variant,
            color,
            size
        });

        this.element.classList.add(
            'zextra-button',
            `zextra-button--${variant}`,
            `zextra-button--${color}`,
            `zextra-button--${size}`
        );
    }
}

const Button = ({
    text,
    variant = 'contained',
    color = 'primary',
    size = 'medium'
} = {}) => new UIButton(text, variant, color, size);

export {
    UIButton,
    Button
};