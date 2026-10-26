import { tags, UIElement } from "ziko/dom";
import {
    ElectricBorderEngine
} from './engine.js'


const { canvas, div, h3, p } = tags;

class UIElectricBorder extends UIElement {
  constructor({
    octaves = 10,
    lacunarity = 1.6,
    gain = .7,
    frequency = 10,
    baseFlatness = 0,
    displacement = 60,
    borderOffset = 60, 
    color = 'darkblue',
    speed = 1.2,
    chaos = 0.12,
    borderRadius = 20,
  } = {}, ...items) {
    super({ element: "div", name: "electric_ratio" });
    this.setAttr({
        class : 'zextra-electric-border'
    })
    this.canvas =  canvas()
    this.canvas_wrapper = div({ class: "canvas-wrapper" }, this.canvas)
    this.glow_layers = div(
        { class: "glow-layers" },
        div({ class: "glow-layer glow-1" }),
        div({ class: "glow-layer glow-2" }),
        div({ class: "glow-layer glow-3" }),
    )
    this.card_content = div(
        { class: "card-content" },
        ...items
    )
    this.append(
        this.canvas_wrapper,
        this.glow_layers,
        this.card_content,
    )

    requestAnimationFrame(() => {
        new ElectricBorderEngine(this.element, this.canvas.element, {
          color,
          speed,
          chaos,
          borderRadius
        });
      });
  }

}

export const ElectricBorder = (options = {}, ...items) => new UIElectricBorder(options, ...items)