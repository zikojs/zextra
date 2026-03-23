import { UIElement, tags } from "ziko/ui";

export class UIVideo extends UIElement{
    constructor(){
        super({element : 'video', name : 'zextra-video'})
    }
}

export const Video = ({} = {}) => new UIVideo()