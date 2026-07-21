import { MorphingText } from "zextra/typography/morphing-text";
import { ElectricBorder } from 'zextra/decorators/electric-border'
// MorphingText(['Hello', 'world']).mount(document.body)

import { tags } from "ziko/src/dom/index.js";
const {h3, p} = tags

globalThis.a = ElectricBorder(
    {},
    h3("Electric Card"),
    p(
        "A procedural plasma border running smoothly on an HTML5 canvas inside a vanilla setup.",
    ),

).mount(document.body)