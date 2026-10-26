// Inspiration : ChakraUI
import { UIElement } from 'ziko/dom';
import { ZextraUI } from '../../../constructor/zextra-ui.js';
export class UIDownloadTrigger extends ZextraUI{
    constructor({data, fileName, mimeType = 'text/plain'} = {}, controller){
        super({element : controller instanceof UIElement ? controller.element : controller})
        Object.assign(this.cache,{
            data,
            fileName,
            mimeType
        })
        this.setup()
    }
    get blob(){
        const {mimeType, data} = this.cache
        return data instanceof Blob ? data : new Blob([data], { type: mimeType })
    }
    get url(){
        return URL.createObjectURL(this.blob);
    }
    setup(){
        this.onClick(()=>{
            const link = tags.a({href : this.url, download : this.cache.fileName})
            link.element.click();
            URL.revokeObjectURL(this.url);
        })
    }
}
export const DownloadTrigger = (props = {}, controller) => new UIDownloadTrigger(props, controller)