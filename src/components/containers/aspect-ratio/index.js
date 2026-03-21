import { UIElement, View } from "ziko/domm";
import './index.css'

class UIAspectRatio extends UIElement{
    constructor(item, {ratio}){
        super({element : 'div', name : 'aspect_ratio'})
        Object.assign(this.cache, { ratio })
        // this.style({
        //     aspectRatio : '1.33/1',
        //     // aspectRatio : '4/3'
        // })
        this.setRatio(ratio);
        this.setAttr({
            class : 'aspect-ratio'
        })
        this.append(item)
    }
    get ratio(){
        return this.cache.ratio;
    }
    setRatio(ratio){
        this.style({aspectRatio : normalize_ratio(ratio)});
        return this;
    }
}

function normalize_ratio(ratio) {
  if (typeof ratio === 'number' && Number.isFinite(ratio)) {
    return ratio > 0 ? ratio : null
  }

  if (typeof ratio !== 'string') return null

  const str = ratio.trim()

  // a:b
  if (str.includes(':')) {
    const [a, b] = str.split(':').map(Number)
    if (a > 0 && b > 0) return `${a} / ${b}`
  }

  // a/b
  if (str.includes('/')) {
    const [a, b] = str.split('/').map(Number)
    if (a > 0 && b > 0) return `${a} / ${b}`
  }

  // fallback: numeric string
  const n = Number(str)
  if (Number.isFinite(n) && n > 0) return n

  return null
}


const AspectRatio = (item, {ratio = '1:1'} = {}) => new UIAspectRatio(item, { ratio })
export{
    UIAspectRatio,
    AspectRatio
}