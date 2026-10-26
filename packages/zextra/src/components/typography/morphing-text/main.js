import { tags } from 'ziko/dom';

export function MorphingText(texts = []){
    const {div, span, svg, defs, filter, feColorMatrix} = tags;

    const text1 = span({id: "text1", class: "text"});
    const text2 = span({id: "text2", class: "text"})

    const text_container = div({
        class: "container"},
        text1,
        text2,
    )
    const svg_filter = svg(
        defs(
            filter({id: "threshold"},
                feColorMatrix({
                    in: "SourceGraphic", 
                    type: "matrix", 
                    values: "1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 255 -140"
                }),
            ),
        ),
    )

    let textIndex = 0;
    let morph = 0;
    let cooldown = 0;

    const morphTime = 1.5;
    const cooldownTime = 0.5;

    let time = new Date();

    function setStyles(fraction) {
        text2.element.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2.element.style.opacity = `${Math.pow(fraction, 0.4)}`;

         const inv = 1 - fraction;

        text1.element.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
        text1.element.style.opacity = `${Math.pow(inv, 0.4)}`;

        text1.element.textContent = texts[textIndex % texts.length];
        text2.element.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
        textIndex++;
    }
    }

    function doCooldown() {
        morph = 0;
        text2.element.style.filter = "none";
        text2.element.style.opacity = "1";

        text1.element.style.filter = "none";
        text1.element.style.opacity = "0";
    }

    function animate() {
        requestAnimationFrame(animate);

        const newTime = new Date();
        const dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
            morph += dt;
            doMorph();
        } else {
            doCooldown();
        }
    }

    // init
    text1.element.textContent = texts[0];
    text2.element.textContent = texts[1];

    animate();

    return div(
        text_container,
        svg_filter
    )

}