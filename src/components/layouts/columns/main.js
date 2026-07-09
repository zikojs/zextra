import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { call_with_optional_props } from 'ziko/dom';
export class UIColumns extends ZextraUI{
    constructor({gap = 1} = {}, ...items){
        super({element : 'div'})
        this.sx({
            // display : 'grid',
            // gridTemplateColumns : typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols,
            display : 'flex',
            flexDirection : 'row',
            gap
        })   
        this.append(...items)
    }
}
export const Columns = call_with_optional_props(UIColumns)