import { tags } from "ziko/dom";
import { ZextraUI } from "../../../constructor/zextra-ui.js";
import '../../../styles/conventions.css'

class UIShortcut extends ZextraUI{
    constructor(keys){
        super({ element : 'kbd', name : 'shortcut'})
        this.icon = tags.span('⌘');
        this.keys = keys.map(key => tags.span(key));
        this.append(this.icon, ...this.keys);
        this.sx({
            display : 'flex',
            gap : 1
        })
    }
}

const Shortcut = ({keys}) => new UIShortcut(keys);
export{
    UIShortcut,
    Shortcut
}