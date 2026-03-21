import { Columns } from "zextra/layouts/columns";
import { ScrollArea } from "zextra/containers";
import { DownloadTrigger } from "zextra/actions";
import { tags } from "ziko/dom";

const {p, pre, a} = tags

globalThis.d = DownloadTrigger({data : 'hello', fileName : 'test'}, tags.button('Download'))


globalThis.s = ScrollArea(
    a({href : '#bottom', id: 'top'}, 'go bottom'),
    pre(`
        r

        ratior
        r

        r

        r
        r
        r
        r

        d

        dd

        darkblued
        d
        d
        d
        d
        d
        d
        d
        d
        d
        d

        darkblued
        darkblued
        d


        d
        d
        d
        d
        d

        `),
        a({href : '#top', id: 'bottom'}, 'go top'),
).style({
    maxHeight : '200px',
    border : '1px darkblue solid'
})
s.mount(document.body)
// globalThis.col = Columns(
//     p('p1'),
//     p('p2')
// )

// col.mount(document.body)

export default function App(){

    globalThis.col = Columns(
        p('p1'),
        p('p2')
    )

    return p('k')


}
// import { Flex } from "ziko";
// import {
//     Modal,
//     Collapsible
// } from "zextra/ui";
// import { h1, p } from "ziko";
// // Modal("kkdk").open().onClick(e=>e.target.close())
// export default ()=>Flex(
//     Collapsible(
//         "What is Zextra ?",
//         p("is a"),
//     )
// ).style({
//     border : "1px red solid"
// }).vertical(0, 0)