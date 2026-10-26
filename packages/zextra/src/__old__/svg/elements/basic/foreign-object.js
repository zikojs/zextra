import ZikoSvgElement from "../ZikoSvgElement.js";
import { Flex } from "ziko"
class ZikoSvgForeignObject extends ZikoSvgElement{
    constructor(x=0,y=0,w="100%",h="100%",...UIElement){
      super("foreignObject")
      this.items=[];
      this.element=document?.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject",
      );
      this.container=Flex().setTarget(this.element).vertical(0,0).size("auto","auto");
      this.container.st.scaleY(-1);
      this.posX(x).posY(y).width(w).height(h);
    } 
    width(w){
        this.element.etAttribute("width",w)
        return this;
    }
    height(h){
        this.element.etAttribute("height",h)
        return this;
    }
    add(...UIElement){
      this.container.append(...UIElement);
      return this;
      }
    remove(...UIElement){
      this.container.append(...UIElement);
      return this;   
      }
  } 
const svgObject=(x, y, w, h)=>new ZikoSvgForeignObject(x, y, w, h);
export { 
  svgObject,
  ZikoSvgForeignObject
}