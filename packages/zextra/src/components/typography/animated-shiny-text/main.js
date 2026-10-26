import {tags} from 'ziko/dom'
export function AnimatedShinyText({
    shw = 100,
    text_color = "rgba(1,1,1,0.5)",
    shine_color = "rgba(1,1,1,0.9)"
} = {}, text = ''){
    const ui = tags.span({class : 'zextra-shiny-text'}, text);
    const el = ui.element;
    el.style.setProperty("--shiny-width", shw + "px");
    el.style.setProperty("--text-color", text_color);
    el.style.setProperty("--shine-color", shine_color);
    return ui
}