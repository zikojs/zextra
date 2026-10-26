import {tags} from 'ziko/dom'
export function AnimatedGradientText({
    speed = 1,
    start_color = "#ffaa40",
    end_color = "#9c40ff",
} = {}, text = ''){
    const ui = tags.span({class : 'zextra-gradient-text'}, text);
    const el = ui.element;

    el.style.setProperty("--bg-size", (speed * 300) + "%");
    el.style.setProperty("--color-from", start_color);
    el.style.setProperty("--color-to", end_color);

    el.style.animationDuration = (3 / speed) + "s";
    return ui
}