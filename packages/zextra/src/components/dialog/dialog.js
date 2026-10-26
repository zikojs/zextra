import { UIElement } from 'ziko/dom'
class UIDialog extends UIElement{
    constructor(content){
        super({element : 'dialog', name : 'zextra_dialog'});
        this.append(content)
    }
    show(){
        console.log('Override works')
    }
    open(){
        this.element.show()
    }
    close(){
        this.element.close()
    }
}

const Dialog = (content) => UIDialog(content)
export{
    UIDialog,
    Dialog
}