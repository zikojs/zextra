import {tags, call_with_optional_props} from 'ziko/dom'
import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { register } from 'ziko/helpers/register'
const { div } = tags;

export class MarqueeUI extends ZextraUI{
    constructor({baseVelocity, scrollReactivity = false} = {}, ...items){  
        super({element : 'div'})
        this.setAttr({class : 'zextra marquee'})
        this.marquee_content = div({class : 'zextra marquee-content'})   
        register(this, {
            append : function(...items){
                this.marquee_content.append(...items)
            }
        })
        super.append(this.marquee_content);
        this.globalScrollVelocity = 0;
        this.lastScrollY = globalThis?.scrollY
        this.scrollTimeout = null;
    }
    append(...items){
        this.marquee_content.append(...items)
    }
}


export const Marquee = call_with_optional_props(MarqueeUI);