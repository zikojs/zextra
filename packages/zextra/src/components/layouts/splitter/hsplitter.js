import { __UISplitter__ } from "./__splitter__.js";

// To Do : Add Swipe Right / Left
class UIHSplitter extends __UISplitter__{
    constructor(left_pane, right_pane){
        super("row", "ew-resize", "width")
        this.left_pane = left_pane.style({
            width:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.right_pane = right_pane.style({
            width:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.element?.append(
            this.left_pane.element,
            this.resizer.element,
            this.right_pane.element
        );
        this.onPtrMove(e=>{
            if (!this.cache.isResizing) return;
            const containerWidth = this.element.getBoundingClientRect().width; // height
            const pointerRelativeXpos = e.event.clientX - this.element.getBoundingClientRect().x; // y
            let newLeftPaneWidth = (pointerRelativeXpos / containerWidth) * 100;
            let newRightPaneWidth = 100 - newLeftPaneWidth;
            if (newLeftPaneWidth < 0) newLeftPaneWidth = 0;
            if (newRightPaneWidth < 0) newRightPaneWidth = 0;
            this.left_pane.element.style.width = `${newLeftPaneWidth}%`;
            this.right_pane.element.style.width = `${newRightPaneWidth}%`;
        })
    }
    get isHSplitter(){
        return true;
      }
}
const HSplitter=(left_pane, right_pane)=>new UIHSplitter(left_pane, right_pane);
export{
    UIHSplitter,
    HSplitter
}