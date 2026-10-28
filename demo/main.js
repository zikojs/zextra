import { MorphingText } from "zextra/typography/morphing-text";
import { Wrap } from "zextra/containers/wrap";
import { ElectricBorder, ShineBorder } from 'zextra/borders'
// MorphingText(['Hello', 'world']).mount(document.body)
import { Random } from 'ziko/math'
import { Joystick } from 'zextra/inputs/joystick'
import { TableOfContents } from "zextra/nav/table-of-contents";
import { Marquee } from "zextra/reveal";
import { tags } from "ziko/dom";
import { Skeleton } from 'zextra/feedback'

import { PixelImage } from 'zextra/media'

import { UIGlimpse, Glimpse } from "zextra/nav/glimpse";


import { FloatingPanel } from "zextra/overlays/FloatingPnael";

// import { Link } from 'zextra/nav/link'

// globalThis.Link = Link

const TARGET = document.body;

globalThis.fp = FloatingPanel().mount(TARGET).open().toggleExtend()

globalThis.g = Glimpse(
    {
        title: "GitHub: Let's build from here",
          description: "GitHub is where over 100 million developers shape the future of software, together.",
        image : 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80'
    },
    'Visit Github ...'
).mount(document.body)


const {h3, p} = tags

globalThis.sk = Skeleton().mount(document.body)

globalThis.m = Marquee()

globalThis.pi = PixelImage({src : 'https://picsum.photos/id/1062/400/300'}).mount(document.body)

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

TableOfContents().mount(document.body).style({
    position : 'fixed',
    right : '0'
})

ShineBorder({shineColor: ["#a855f7", "#ec4899", "#3b82f6"]}, j).mount(document.body)

