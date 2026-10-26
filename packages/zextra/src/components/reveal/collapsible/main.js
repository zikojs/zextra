import { UIElement, tags } from "ziko";
class UICollapsible extends UIElement{
    constructor(summary_content, content){
        super({element : 'details', name: 'collapsible'});
        this.summary = summary(summary_content);
        this.content_wrapper = content_wrapper(content);
        this.append(
            this.summary,
            this.content_wrapper
        )
        this.init()
    }
    isExpanded(){
        return this.element.open;
    }
    expand(){
        if(!this.element.open){
            const content = this.content_wrapper.element
            this.element.open = true;
            const fullHeight = this.content_wrapper.element.scrollHeight;
            this.content_wrapper.style({
                height : fullHeight + 'px'
            })
            content.addEventListener("transitionend", function handler1() {
                content.style.height = "auto"; 
                content.removeEventListener("transitionend", handler1);
            });
        }
        return this;
    }
    collapse(){
        if(this.element.open){
            const content = this.content_wrapper.element
            const details = this.element;
            const fullHeight = content.scrollHeight;
            content.style.height = fullHeight + "px"; 
            requestAnimationFrame(() => {
                content.style.height = "0px";
            });
            content.addEventListener("transitionend", function handler() {
                details.open = false; 
                content.removeEventListener("transitionend", handler);
            });
        }
        return this;
    }
    toggle(){
        return this.isExpanded() ? this.collapse() : this.expand()
    }
    init(){
      const summary = this.summary.element;
      summary.addEventListener("click", e => {
        e.preventDefault(); // stop instant toggle
        this.toggle()
      });
    }
}


const summary = content => tags.summary({},content).style({
    padding: '0.8rem 1rem',
    cursor: 'pointer',
    listStyle: 'none',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd'
})

const content_wrapper = content => tags.div(
    {},
    tags.div({},content)
).style({
    overflow : 'hidden',
    height : 0,
    transition : 'height 0.3s ease'
})


const Collapsible = (summary_content, content) => new UICollapsible(summary_content, content);
export{
    UICollapsible,
    Collapsible
}