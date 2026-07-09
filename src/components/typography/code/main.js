import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { tags } from 'ziko/dom';
export class UICode extends ZextraUI{
    constructor({ lang, adapter, raw_code}){
        super({element : 'pre'})
        Object.assign(this.cache,{
            lang,
            adapter
        })
        this.setAttr({
            class : 'zextrraw_a-code'
        })
        this.append(
            tags.code(raw_code)
        )
        if(adapter) adapter.call(this);
    }

}
export const Code = ({lang, adapter}, raw_code) => new UICode({lang, adapter}, raw_code)