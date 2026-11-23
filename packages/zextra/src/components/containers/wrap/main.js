import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { callWithOptionalProps } from 'ziko/dom';

export class UIWrap extends ZextraUI{
    constructor({as = 'div', gap} = {}, ...items){
        super({element : as})
        this.setAttr({class : 'zextra wrap'})
        this.append(...items);
        this.setGap(gap);
    }
    setGap(gap){
        this.element.style.setProperty('--zextra-gap', gap);
        return this;
    }
}
export const Wrap = callWithOptionalProps(UIWrap)