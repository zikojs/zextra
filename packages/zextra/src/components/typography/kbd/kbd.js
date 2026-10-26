import { ZextraUI } from "../../../constructor/zextra-ui.js";
import '../../../styles/conventions.css'

class UIKbd extends ZextraUI{
    constructor(keys){
        super({ element : 'kbd', name : 'shortcut'})
        this.append(this.icon, ...keys)
    }
}

const Kbd = ({keys}) => new UIKbd(keys);
export{
    UIKbd,
    Kbd
}