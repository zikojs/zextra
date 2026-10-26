import { UIDialog } from "./dialog.js";
class UIModal extends UIDialog{
    constructor(content){
        super(content)
    }
    open(){
        this.element.showModal()
    }
}

const Modal = content => new UIModal(content)
export{
    UIModal,
    Modal
}