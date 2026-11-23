
import { tags, UIElement } from 'ziko/dom';

const EFFECTS = [
    'ripple',
    'lift',
    'press',
    'glow',
    'shine'
];

class UIButton extends UIElement {
    constructor(
        text,
        variant = 'contained',
        color = 'primary',
        size = 'medium',
        effect = ['ripple']
    ) {
        super({
            element: tags.button(text).element,
            name: 'zextra_button'
        });

        const effects = effect === false
            ? []
            : [...new Set(
                (Array.isArray(effect) ? effect : [effect])
                    .filter(e => EFFECTS.includes(e))
            )];

        Object.assign(this.cache, {
            text,
            variant,
            color,
            size,
            effects
        });

        this.element.classList.add(
            'zextra-button',
            `zextra-button--${variant}`,
            `zextra-button--${color}`,
            `zextra-button--${size}`
        );

        if (effects.length) {
            this.element.classList.add(
                'zextra-effect',
                ...effects.map(e => `zextra-effect--${e}`)
            );
        }

        this.element.classList.add('zextra-effect--focus');
    }
}

const Button = ({
    text,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    effect = ['ripple']
} = {}) => new UIButton(text, variant, color, size, effect);

export {
    UIButton,
    Button
};
