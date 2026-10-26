import { __UISplitter__ } from "./__splitter__.js";

// To Do : Add Swipe Top / Bottom 
class UIVSplitter extends __UISplitter__{
    constructor(top_pane, bottom_pane){
        super("column", "ns-resize", "height")
        this.top_pane = top_pane.style({
            height:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.bottom_pane = bottom_pane.style({
            height:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.element?.append(
            this.top_pane.element,
            this.resizer.element,
            this.bottom_pane.element
        );
        this.onPtrMove(e=>{
            if (!this.cache.isResizing) return;
            const containerHeight = this.element.getBoundingClientRect().height; // height
            const pointerRelativeYpos = e.event.clientY - this.element.getBoundingClientRect().y; // y
            let newTopPaneHeight = (pointerRelativeYpos / containerHeight) * 100;
            let newBottomPaneHeight = 100 - newTopPaneHeight;
            if (newTopPaneHeight < 0) newTopPaneHeight = 0;
            if (newBottomPaneHeight < 0) newBottomPaneHeight = 0;
            this.top_pane.element.style.height = `${newTopPaneHeight}%`;
            this.bottom_pane.element.style.height = `${newBottomPaneHeight}%`;
        })
    }
    get isVSplitter(){
        return true;
    }
}
const VSplitter=(top_pane, bottom_pane)=>new UIVSplitter(top_pane, bottom_pane);
export{
    UIVSplitter,
    VSplitter
}