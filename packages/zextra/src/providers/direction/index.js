import { ZikoProvider } from "../ziko-provider.js";
class ZextraDirectionProvider extends ZikoProvider{
    constructor(component,dir){
        super(component)
        this.component.setAttr({
            dir 
        })
        this.component.style({color : 'red'})

    }
}

export const DirectionProvider = (component, {dir}) => new ZextraDirectionProvider(component, dir)