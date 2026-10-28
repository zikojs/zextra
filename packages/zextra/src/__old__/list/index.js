import { UIElement } from "ziko/dom"
class ZikoUIList extends UIElement{
    constructor({ type = 'ol' } = {}, ...items){
        super(type)
    }
    sort(){

    }
    filter(){
        
    }
}

const List = ({ type = 'ol'} = {}, ...items) => {

    return new ZikoUIList(...items)
}
