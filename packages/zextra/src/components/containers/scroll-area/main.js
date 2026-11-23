import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { callWithOptionalProps } from 'ziko/dom';

export class UIScrollArea extends ZextraUI{
    constructor({element = 'div'} = {}, ...items){
        super({element})
        this.setAttr({class : 'scroll-area'})
        this.append(...items)
    }
}
export const ScrollArea = callWithOptionalProps(UIScrollArea)