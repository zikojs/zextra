// import { FileBasedRouting } from "ziko";
// FileBasedRouting(import.meta.glob("./src/pages/**/*.js"))

import {TreeItem, TreeView} from "zextra/tree-view"
import {Meny} from 'zextra/layouts/meny'
import { Button, Fab } from "zextra/button"
import 'zextra/style/layouts/meny'
import { tags } from "ziko"
const {p} = tags
import 'zextra/style'


Button("Contained", 'contained')
Button("Text", 'text')
Button("Outlined", 'outlined')

const para = (n) => p(`Paragrapge ${n}`).style({
    width : '50%',
    background : 'darkblue',
    color : 'white',
    padding : '10px',
    margin : '1em auto',
    height : '30px'
})
globalThis.ct = tags.section(
    para(1),
    para(2),
    para(3),
    para(4),
    Fab('Fab 0.0', .8, -.5).style({
        width : '220px',
        height : '50px'
    }),
    Fab('Fab 1.0', 1, 0).style({
        width : '100px'
    })
).style({
    width : '400px',
    height : '300px',
    position : 'relative',
    border : '1px darkblue solid',
    margin : '10px 50px',
    display : 'flex',
    flexDirection :'column',
    justifyContetnt : 'center'
})

// const Tree = TreeView({displayNumbering : true},
//     TreeItem({ label : "Zikojs Core"},
//         TreeItem({ label : "Math"},
//             TreeItem({ label : "Functions", href : "#"}),
//             TreeItem({ label : "Complex"}),
//             TreeItem({ label : "Matrix"}),
//             TreeItem({ label : "Random"}),
//         ),
//         TreeItem({ label : "UI"},
//             TreeItem({label : "Primitive Elements"}),
//             TreeItem({label : "Flex"}),
//             TreeItem({label : "Grid"}),
//             TreeItem({label : "Suspense"}),
//             TreeItem({label : "Wrappers"}),
//         ),
//         TreeItem({ label : "App"},
//             TreeItem({label : "Globals "}),
//             TreeItem({label : "Query Params"}),
//             TreeItem({label : "App"}),
//             TreeItem({label : "SPA"}),
//             TreeItem({label : "Client Side File Based Routing"})
//         ),
//         TreeItem({ label : "Time"}),
//         TreeItem({ label : "Interactivity"},
//             TreeItem({label : "Events"}),
//             TreeItem({label : "Observers"}),
//             TreeItem({label : "Event Emitter"}),
//         ),
//         TreeItem({ label : 'Use'},
//             TreeItem({ label : 'useTitle'}),
//             TreeItem({ label : 'useFavicon'}),
//             TreeItem({ label : 'useLocaleStorage'}),
//             TreeItem({ label : 'useSessionStorage'}),
//             TreeItem({ label : 'useChannel'}),
//             TreeItem({ label : 'useEventEmimiter'}),
//             TreeItem({ label : 'useTitle'}),
//             TreeItem({ label : 'useThread'}),
//         )
//     ),
//     TreeItem({label : "Ziko-Server"},
//         TreeItem({label : "File Based Routing"}),
//         TreeItem({label : "Server Side Rendering"}),
//         TreeItem({label : "Static Site Generation"}),
//         TreeItem({label : "Client Side Hydration"}),
//     ),
//     TreeItem({label : "Mdzjs", href: 'https://github.com/zakarialaoui10/mdzjs'}),
//     TreeItem({label : "Ziko-Wrapper"},
//         TreeItem({label : "Hyperscript-Based"},
//             TreeItem({label : "Vanjs"}),
//         ),
//         TreeItem({label : "JSX-Based"},
//             TreeItem({label : "React"}),
//             TreeItem({label : "Preact"}),
//             TreeItem({label : "Solid"})
//         ),
//         TreeItem({label : "Template-Based"},
//             TreeItem({label : "Vue"}),
//             TreeItem({label : "Svelte"}),
//         ),
//         TreeItem({label : "Meta-Frameworks"},
//             TreeItem({label : "Astro"}),
//             TreeItem({label : "Next"}),
//             TreeItem({label : "Svelte-Kit"}),
//             TreeItem({label : "Solid-Start"}),
//             TreeItem({label : "Nuxt"}),
//             TreeItem({label : "Remix"}),
//         )
//     ),
//     TreeItem({label : "Zextra"},
//             TreeItem({label : "UI Components"}),
//             TreeItem({label : "Math "}),
//     ),
//     TreeItem({label : "Addons"},
//             TreeItem({label : "Ziko-gl"}),
//             TreeItem({label : "Ziko-code "}),
//             TreeItem({label : "Ziko-chart "}),
//             TreeItem({label : "Ziko-icons "}),
//             TreeItem({label : "P5.wrapper "}),
//             TreeItem({label : "Ziko-lottie "}),
//             TreeItem({label : "Ziko-keyframes "}),
//             TreeItem({label : "Ziko-pdf "}),
//             TreeItem({label : "Ziko-tsl "}),

//     ),
//     TreeItem({label : "Transformers"},
//             TreeItem({label : "Xlsx-Transformer"}),
//             TreeItem({label : "Word-Transformer"}),
//     ),
//     TreeItem({label : "Adapters"},
//             TreeItem({label : "Deno"}),
//             TreeItem({label : "Bun"}),
//     ),
//     TreeItem({label : "Kit"},
//             // TreeItem({label : "9.1 Xlsx-Transformer"}),
//     ).style({
        
//     })
// ).style({
//     color : 'darkblue',
//     border : '2px darkblue solid',
//     display : 'inline-block',
//     // background : 'var(--zextra-color-primary)',
//     color : 'var(--zextra-color-primary)',
//     fontSize : 'var(--zextra-large-font)'
// })

// globalThis.Tree = Tree

// // globalThis.m = Meny(Tree, tags.section('jjdj')).size("80vw", "50vh")


// globalThis.m = Meny(
//     Tree,
//     tags.section('Content').style({
//         // width : '200px',
//         height : '100%',
//         background : 'gray'
//         // border : '1px blue solid'
//     }),
//     {
//         position : 'left'
//     }
// ).style({
//     margin : 0,
//     height : '100vh',
//     width : '100vw'
// })