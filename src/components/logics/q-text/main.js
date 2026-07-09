import { UIElement } from "ziko/dom/index.js";
import { clamp } from 'ziko/math/utils/index.js'
class UIQText extends UIElement{
    constructor({score, func = Math.floor}, text, after = ''){
        super()
        this.init(score, func, text, after);
    }
    init(score, func, text, after){
        super.init('span', 'qtext', 'html', true);
        score = clamp(score, 0, 1);
        const count = func(text.length * score);
        this.element.innerText = text.slice(0, count);
        if(after) this.element.innerText += after;
    }
}

const QText=({score}, text, after)=>new UIQText({score}, text, after);
export{
    UIQText, 
    QText
}