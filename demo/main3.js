// import { Collapsible, Accordion } from "zextra/surface";
// import { Modal } from "zextra/dialog";
import { Fade , Grow, Slide} from "zextra/transition";
import 'zextra/style'
import {  tags } from "ziko/dom";

// import { Callout } from "zextra/feedback";
// import  Check  from 'ziko-lucide/Check'
import { QView, QText } from "zextra/q";

// globalThis.f = Slide({},
//     tags.p('I am faded').style({
//         width : '400px',
//         height : '400px',
//         background  : 'darkblue'
//     })
// )
// tags.p('After')

// // globalThis.s=tags.svg(
// //     { viewBox:"0 0 24 24", width:"20", height:"20", ariaHidden:"true" },
// //     tags.path({
// //         fill:"currentColor",
// //         d:"M12 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V7H9a1 1 0 1 1 0-2h2V3a1 1 0 0 1 1-1Zm-7 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Zm3-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H8Z"
// //     })
// // )
// globalThis.c1 = Collapsible(
//     'Summary 1', 
//     tags.pre({},`
//         ddkd
//         jdjd
//         djdjd
//         jdjdo
//         `)
// )
// globalThis.c2 = Collapsible(
//     'Summary 2', 
//     tags.pre({},`
//         ddkd
//         jdjd
//         djdjd
//         jdjdo
//         `)
// )

// globalThis.a=Accordion({},
//     c1,
//     c2
// )
// globalThis.m = Modal(a)

// globalThis.cal = Callout({
//     icon: Check(), 
//     // title : 'callout'
// }, 'This is a callout')
const {li} = tags
const items = new Array(10).fill(null).map((n,i)=> n = li(`item : ${i+1}`))
QView({ score : .72}, tags.ol(), ...items
)


globalThis.a = QText({score : 0.5}, 'Hello world!', '...')