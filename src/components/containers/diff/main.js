import { UIElement, tags } from "ziko";

class UIDiff extends UIElement{
    constructor(item1, item2, {orientation = 'vertical'} = {}){
        super({element : 'div', name:'diff'})
        Object.assign(this.cache, {orientation})
        this.item_before = diff_item_wrapper(item1)
        this.item_after = diff_item_wrapper(item2)
        this.resizer = diff_resizer()
        this.append(
            this.item_before, 
            this.item_after,
            this.resizer
        )
        .style({
            position : 'relative',
            overflow : 'hidden',
            touchAction : 'none',
            // padding : '2px'
        })
        this.#setupOrientation();
        this.#setupEvents()
    }
    #setupOrientation(){
        if (this.cache.orientation === 'horizontal') {
            this.item_after.style({ clipPath : 'inset(0 50% 0 0)' })
            this.resizer.style({
                width : '4px',
                left : '50%',
                top : 0,
                bottom : 0,
                cursor : 'ew-resize'
            })
        } else {
            this.item_after.style({ clipPath : 'inset(0 0 50% 0)' })
            this.resizer.style({
                height : '4px',
                top : '50%',
                left : 0,
                right : 0,
                cursor : 'ns-resize'
            })
        }
    }
    #setupEvents(){
        let isDraging = false;
        this.resizer.onPtrDown(e=>{
            this.style({ userSelect : 'none'})
            isDraging = true;
            e.event.preventDefault()
        })
        this.onPtrUp(()=>{
            isDraging = false;
            this.style({ userSelect : ''})
        })
        this.onPtrMove(e=>{
            if(!isDraging) return;
            const rect = this.element.getBoundingClientRect()
            if(this.cache.orientation === 'horizontal'){
                let offsetX = e.event.clientX - rect.left;
                offsetX = Math.max(0, Math.min(rect.width, offsetX));
                const percent = (offsetX / rect.width) * 100;
                this.item_after.style({ clipPath : `inset(0 ${100 - percent}% 0 0)` })
                this.resizer.style({ left : `${percent}%` })
            }
            else{
                let offsetY = e.event.clientY - rect.top;
                offsetY = Math.max(0, Math.min(rect.height, offsetY));
                const percent = (offsetY / rect.height) * 100;
                this.item_after.style({ clipPath : `inset(0 0 ${100 - percent}% 0)` })
                this.resizer.style({ top : `${percent}%` })              
            }
        })
    }
}

const diff_item_wrapper=(item)=>tags.div(item).style({
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        bottom : 0 
    })
const diff_resizer = () => tags.div().style({
            position : 'absolute',
            background : '#ccc',
            zIndex : '3', 
            tocuhAction : 'none'
    })

const Diff=(item1, item2)=>new UIDiff(item1, item2);
export {
    UIDiff,
    Diff
}