import { Columns } from "zextra/layouts/columns";
import { Blockquote } from "zextra/typography";
import { TableOfContents } from 'zextra/nav'
import { tags } from "ziko/dom";


globalThis.b = Blockquote({
    cite : 'kdkdk.js',
    quote : 'kkkfd dkkd dhhdhd dhdhd dhdhdhd dhdhdh dddhd djddhd dhdhdhd dhdhdhd djdjdjd djjdjd djdjdjd d djdjd '
})

const {p} = tags
globalThis.a = TableOfContents({depth : [1, 3]})
a.mount(document.getElementById('app'))
export default function App(){


    globalThis.col = Columns(
        {gap : 10},
        p('p1'),
        p('p2')
    )
    return col
    // return p('k')


}

// import { View, tags, Flex, text } from "ziko/dom";
// import { Center } from 'zextra/containers'
// import { Shortcut } from 'zextra/typography'
// import { DirectionProvider } from "zextra/providers/direction";
// import { Autocomplete } from 'zextra/inputs'
// import { TableOfContents } from 'zextra/nav'
// const dataset = [
//     "JavaScript",
//     "TypeScript",
//     "VanJS",
//     "React",
//     "SolidJS",
//     "Svelte",
//     "Vue",
//     "ZikoJS"
//   ]

// //   globalThis.a=Autocomplete({dataset})
// //   a.mount(document.body)
// globalThis.toc = TableOfContents()
// toc.mount(document.getElementById("app"))
// export default function(){
//     globalThis.c = Center(
//         // tags.kbd('⌘ Ctrl')
//         // Autocomplete({dataset}),
//         Shortcut({keys : ['Ctrl', 'K']})
//     ).style({
//         width : '80vw',
//         height :'400px',
//         margin : '20px auto'
//     })
//     c.sx(
//         {
//             borderColor : {
//                 base : 'red',
//                 xs : 'darkblue',
//                 sm : 'blue',
//                 md : 'green',
//                 lg : 'yellow'
//             },
//             borderRadius : {
//                 base : "1em"
//             },
//             p : {
//                 base : 0,
//                 xs : 3,
//                 sm : 6,
//                 md : 9,
//                 lg : 12
//             },
//             visibility : {
//                 base : 'visible',
//                 xs : 'hidden',
//                 // sm : 'visible'
//             }

//         }
//         // {p : {base : 0, lg : 10}, m:{sm : 10, base : 1}}
//     )
//     globalThis.prv = DirectionProvider(
//         DirectionProvider(c, {dir : 'ltr'}), {dir : 'ltr'}
//     )
//     return prv.component
// }
// // import { RatingInput } from 'zextra/inputs'
// // import { Content, Bleed, AspectRatio, Draggable } from "zextra/containers";
// // import { Link, Breadcrumbs } from 'zextra/nav'
// // import Heart from 'ziko-lucide/heart'
// // import Star from 'ziko-lucide/star'
// // // import ArrowUpRight from 'ziko-lucide/arrowupright'
// // import { Button } from "zextra/buttons";
// // // const b = Button()

// // const l = Link({
// //     href : '#',
// //     underline : true,
// //     // end_icon : ArrowUpRight({stroke : 'darkblue'})
// // }, "More Informations ... y..y.. ").style({
// //     border : '1px red solid',
// //     // margin : '50px auto',
// // })

// // const aa = Link({
// // })

// // globalThis.d = Draggable(l).style({
// //     padding : '10px'
// // })

// // globalThis.l = Link({
// //     href : '#',
// //     icon : false
// //     // end_icon : ArrowUpRight({stroke : 'darkblue'})
// // }, "Hello").style({
// //     // border : '1px red solid',
// //     // margin : '50px auto',
// // })

// // globalThis.b = Breadcrumbs(
// //     tags.a({href : '#'}, 'link 1'),
// //     tags.a({href : '#'}, 'link 2'),
// //     tags.a({href : '#'}, 'link 2'),
// //     tags.a({href : '#'}, 'link 2'),
// //     tags.a({href : '#'}, 'link 2'),
// //     l
// // ).style({
// //     border : '1px red solid',
// //     margin : '10px'
// // })


// // {/* <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe> */}
// // // AspectRatio(
// // //     tags.iframe({src : "https://www.youtube.com/embed/dQw4w9WgXcQ"})
// // // )


// // // Flex(
// // //     Content(
// // //     tags.span('s1 ...'),
// // //     tags.span('s2 ...'),
// // //     tags.span('s3 ...')
// // //     ),
// // //     tags.span('s4 ...'),
// // //     Bleed("This is a bleed").style({
// // //         background : 'gold',
// // //         padding : '10px',
// // //         border : '2px darkblue solid'
// // //     })
// // // ).style({
// // //     border : '2px darkblue solid',
// // //     width : '300px',
// // //     padding : '20px',
// // //     margin : '30px auto'
// // // })
// // // .vertical(0, 0, 1)




// // // globalThis.r = RatingInput(
// // //     Heart({ stroke : 'none', fill : '#777'}),
// // //     Heart({ stroke : 'none', fill : '#777'}),
// // //     Heart({ stroke : 'none', fill : '#777'}),
// // //     Heart({ stroke : 'none', fill : '#777'}),
// // //     Star({ stroke : 'none', fill : '#777'})
// // // )

// // // View(
// // //     r,
// // //     tags.p("The current value is ", r.current_state)
// // // ).style({
// // //     position : 'absolute',
// // //     top : '50%',
// // //     left : '50%',
// // //     transform: 'translate(-50%, -50%)',
// // //     border : '2px #777 solid',
// // //     padding : '15px'
// // // })




// // // r.onChange(v=>console.log(v))
// // // r.on('value-changed', n => console.log(n.detail.value))

// // // import { Diff } from "zextra/containers";

// // // const src1 = 'https://picsum.photos/id/1015/800/400';
// // // const src2 = 'https://picsum.photos/id/1016/800/400';

// // // globalThis.d = Diff(
// // //     tags.img({src : src1}),
// // //     tags.img({src : src2}),
// // // ).style({
// // //     width : '80vw',
// // //     height : '400px'
// // // })
// // // import { tags, App, Flex } from "ziko"

// // // console.log(1)

// // // const {QueryParams} = __Ziko__
// // // export default ()=>{
// // //     return App({
// // //         head : {
// // //             title : "ziko",
// // //         },
// // //         wrapper : ()=>Flex(tags.p("Hello world").style({
// // //             color : QueryParams.color ?? "black"
// // //         })).size("100vw","100vh").vertical(0,0)
// // //     })
// // // }
// // // document.body.style.overflow = "hidden"
// // // // export default ()=>{
// // // //     return p("Hello from zikojs File based routing ").style({
// // // //         color:"red",
// // // //         fontFamily : "Gloria Hallelujah"
// // // //     })
// // // // }