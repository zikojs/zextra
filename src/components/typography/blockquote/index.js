import { ZextraUI } from '../../../constructor/zextra-ui.js';
import { tags } from 'ziko/dom';
import './index.css'
export class UIBlockquote extends ZextraUI{
    constructor({ cite, quote = ''} = {}){
        super({element : 'blockquote'})
        this.setAttr({
            cite,
            class : 'zextra-blockquote'
        })
        this.append(
            tags.p(quote)
        )
    }
}
export const Blockquote = ({cite, quote}) => new UIBlockquote({cite, quote})