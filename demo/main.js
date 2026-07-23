import { MorphingText } from "zextra/typography/morphing-text";
import { Wrap } from "../src/components/containers/wrap";
import { ElectricBorder } from 'zextra/decorators/electric-border'
// MorphingText(['Hello', 'world']).mount(document.body)
import { Random } from 'ziko/math'
import { Joystick } from 'zextra/inputs/joystick'

import { tags } from "ziko/src/dom/index.js";
const {h3, p} = tags

const pp = () => p('Hello world').style({
    width : Random.int(100,300)+'px',
    height : Random.int(50,150)+'px', 
    background : Random.color.hex()
})

Wrap({
    gap : '20px'
},
   pp(),
   pp(),
   pp(),
   pp()
).mount(document.body).style({
    border : '1px red solid',
    margin : '10px',
    width : '50vw'
})

globalThis.a = ElectricBorder(
    {},
    h3("Electric Card"),
    p(
        "A procedural plasma border running smoothly on an HTML5 canvas inside a vanilla setup.",
    ),

).mount(document.body)


globalThis.j = Joystick().mount(document.body)
 j.element.addEventListener("change", (e) => {
      console.log("Circle [change]:", e.detail);
    });