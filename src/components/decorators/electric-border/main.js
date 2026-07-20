import { tags, UIElement } from "ziko/dom";
import {
    random,
    noise2D,
    octavedNoise,
    getCornerPoint,
    getRoundedRectPoint
} from './utils.js'

const { canvas, div, h3, p } = tags;

class UIElectricBorder extends UIElement {
  constructor({
    octaves = 10,
    lacunarity = 1.6,
    gain = .7,
    frequency = 10,
    baseFlatness = 0,
    displacement = 60,
    borderOffset = 60
  } = {}) {
    super({ element: "div", name: "electric_ratio" });
    this.setAttr({
        class : 'electric-card-container'
    })
    this.canvas =  canvas({ id: "electricCanvas" })
    this.canvas_wrapper = div({ class: "canvas-wrapper" }, this.canvas)
    this.glow_layers = div(
        { class: "glow-layers" },
        div({ class: "glow-layer glow-1" }),
        div({ class: "glow-layer glow-2" }),
        div({ class: "glow-layer glow-3" }),
    )
    this.card_content = div(
        { class: "card-content" },
        h3("Electric Card"),
        p(
          "A procedural plasma border running smoothly on an HTML5 canvas inside a vanilla setup.",
        ),
    )
    this.ctx = this.canvas.element.getContext('2d')
    this.append(
        this.canvas_wrapper,
        this.glow_layers,
        this.card_content,
    )
    this.container = this.element
    this.settings = {
        octaves,
        lacunarity,
        gain,
        frequency,
        baseFlatness,
        displacement,
        borderOffset
    }
    this.states = {
        time = 0,
        lastFrameTime = 0,
        width = 0,
        height = 0,
        lastDpr = 1, 
        animationFrameId = null
    }
    this.setup()
  }
  updateSize() {
    const rect = this.container.getBoundingClientRect();
    const width = rect.width + this.settings.borderOffset * 2;
    const height = rect.height + this.settings.borderOffset * 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);

    this.states.width = width;
    this.states.height = height;
    this.states.lastDpr = dpr;
  }

  draw(currentTime) {
    if (!this.canvas || !this.ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (dpr !== this.states.lastDpr) {
      this.updateSize();
    }

    if (!this.states.lastFrameTime) this.states.lastFrameTime = currentTime;
    const deltaTime = (currentTime - this.states.lastFrameTime) / 1000;
    this.states.time += deltaTime * this.speed;
    this.states.lastFrameTime = currentTime;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(dpr, dpr);

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const left = this.settings.borderOffset;
    const top = this.settings.borderOffset;
    const borderWidth = this.states.width - 2 * this.settings.borderOffset;
    const borderHeight = this.states.height - 2 * this.settings.borderOffset;
    const maxRadius = Math.min(borderWidth, borderHeight) / 2;
    const radius = Math.min(this.borderRadius, maxRadius);

    const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
    const sampleCount = Math.floor(approximatePerimeter / 2);

    this.ctx.beginPath();

    for (let i = 0; i <= sampleCount; i++) {
      const progress = i / sampleCount;
      
      // Called with 'this' passed as context argument
      const point = getRoundedRectPoint(this, progress, left, top, borderWidth, borderHeight, radius);

      const xNoise = octavedNoise(this, progress * 8, this.states.time, 0);
      const yNoise = octavedNoise(this, progress * 8, this.states.time, 1);

      const displacedX = point.x + xNoise * this.settings.displacement;
      const displacedY = point.y + yNoise * this.settings.displacement;

      if (i === 0) {
        this.ctx.moveTo(displacedX, displacedY);
      } else {
        this.ctx.lineTo(displacedX, displacedY);
      }
    }

    this.ctx.closePath();
    this.ctx.stroke();

    this.states.animationFrameId = requestAnimationFrame((t) => this.draw(t));
  }
  setup(){
    this.container.style.setProperty('--electric-border-color', this.color);
    this.container.style.setProperty('--border-radius', `${this.borderRadius}px`);
    this.updateSize();
    this.resizeObserver = new ResizeObserver(() => this.updateSize());
    this.resizeObserver.observe(this.container);
    this.states.animationFrameId = requestAnimationFrame((t) => this.draw(t));
  }  
  destroy() {
    if (this.states.animationFrameId) cancelAnimationFrame(this.states.animationFrameId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }
}

export const ElectricBorder = () => new UIElectricBorder()