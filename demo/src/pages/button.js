import { tags } from 'ziko/dom'
import { Button } from 'zextra/buttons'
const { br } = tags
export default function Page(){
    return tags.section(
        Button({ text : 'Outlined', variant : 'outlined', color : 'primary'}),
        Button({ text : 'Contained', variant : 'contained', color : 'primary'}),
        Button({ text : 'Text', variant : 'text', color : 'primary'}),
        Button({ text : 'Soft', variant : 'soft', color : 'primary'}),
        br(),
        Button({ text : 'Outlined', variant : 'outlined', color : 'secondary'}),
        Button({ text : 'Contained', variant : 'contained', color : 'secondary'}),
        Button({ text : 'Text', variant : 'text', color : 'secondary'}),
        Button({ text : 'Soft', variant : 'soft', color : 'secondary'}),
        br(),
        Button({ text : 'Outlined', variant : 'outlined', color : 'error'}),
        Button({ text : 'Contained', variant : 'contained', color : 'error'}),
        Button({ text : 'Text', variant : 'text', color : 'error'}),
        Button({ text : 'Soft', variant : 'soft', color : 'error'}),
        br(),
        Button({ text : 'Outlined', variant : 'outlined', color : 'success'}),
        Button({ text : 'Contained', variant : 'contained', color : 'success'}),
        Button({ text : 'Text', variant : 'text', color : 'success'}),
        Button({ text : 'Soft', variant : 'soft', color : 'success'}),
        br(),
        Button({ text : 'Outlined', variant : 'outlined', color : 'warning'}),
        Button({ text : 'Contained', variant : 'contained', color : 'warning'}),
        Button({ text : 'Text', variant : 'text', color : 'warning'}),
        Button({ text : 'Soft', variant : 'soft', color : 'warning'}),
    )
}