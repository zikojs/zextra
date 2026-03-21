import { UIElement } from "ziko/dom";
import './index.css'
class UIDraggable extends UIElement{
    constructor(...items){
        super({element : 'div', name : 'draggable'})
        this.setAttr({
            class : 'zextra-draggable',
            tabindex : '0',
            role : 'draggable',
            'aria-grabbed' : 'false'
        })
        this.append(...items)
        this.dispose =  this.setup()
    }
    setup(){
        let wrapper = this.element;
        let rect = this.element.getBoundingClientRect()
        let startX = Math.round(rect.x), startY = Math.round(rect.y);
        let currentX = startX, currentY = startY;
        let dragging = false;

        const onPointerDown = (e) => {
            dragging = true;
            wrapper.setPointerCapture(e.pointerId);
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            wrapper.style.transition = 'none';
        };

        const onPointerMove = (e) => {
            if (!dragging) return;
            this.setAttr({ 'aria-grabbed' : 'true' })
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            wrapper.style.transform = `translate(${currentX}px, ${currentY}px)`;
        };

        const onPointerUp = (e) => {
            dragging = false;
            this.setAttr({ 'aria-grabbed' : 'false' })
            wrapper.releasePointerCapture(e.pointerId);
        };

        const onPointerCancel = () => {
            dragging = false;
            this.setAttr({ 'aria-grabbed' : 'false' })
        };

        wrapper.addEventListener('pointerdown', onPointerDown);
        wrapper.addEventListener('pointermove', onPointerMove);
        wrapper.addEventListener('pointerup', onPointerUp);
        wrapper.addEventListener('pointercancel', onPointerCancel);

        const dispose = () => {
            wrapper.removeEventListener('pointerdown', onPointerDown);
            wrapper.removeEventListener('pointermove', onPointerMove);
            wrapper.removeEventListener('pointerup', onPointerUp);
            wrapper.removeEventListener('pointercancel', onPointerCancel);
        };

        return dispose
    }
}

const Draggable = (...items) => new UIDraggable(...items);

export{
    UIDraggable,
    Draggable
}