import { tags } from 'ziko/dom'
import { Button } from 'zextra/buttons'
export default function Page(){
    return tags.h1({
        class : 'zextra-effect zextra-effect--lift zextra-effect--shine zextra-effect--ripple zextra-effect--glow'},
        'Hello world!'
    ).style({
        border : '1px red solid',
        width : 'max-content',
        background : 'red'
    })
}