function random(context, x) {
      return (Math.sin(x * 12.9898) * 43758.5453) % 1;
    }

    function noise2D(context, x, y) {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = random(context, i + j * 57);
      const b = random(context, i + 1 + j * 57);
      const c = random(context, i + (j + 1) * 57);
      const d = random(context, i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }

    function octavedNoise(context, x, time, seed) {
      let y = 0;
      let amplitude = context.chaos;
      let frequency = context.frequency;

      for (let i = 0; i < context.octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= context.baseFlatness;
        }
        y += octaveAmplitude * noise2D(context, frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= context.lacunarity;
        amplitude *= context.gain;
      }
      return y;
    }

    function getCornerPoint(context, centerX, centerY, radius, startAngle, arcLength, progress) {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }

    function getRoundedRectPoint(context, t, left, top, width, height, radius) {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;

      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(context, left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(context, left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + width - radius - progress * straightWidth, y: top + height };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(context, left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left, y: top + height - radius - progress * straightHeight };
      }
      accumulated += straightHeight;

      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(context, left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }

    // Engine Class
    export class ElectricBorderEngine {
      constructor(container, canvasEl, options = {}) {
        this.container = container;
        this.canvas = canvasEl;
        this.ctx = this.canvas.getContext('2d');

        this.color = options.color || 'lightgreen';
        this.speed = options.speed !== undefined ? options.speed : 1.2;
        this.chaos = options.chaos !== undefined ? options.chaos : 0.12;
        this.borderRadius = options.borderRadius !== undefined ? options.borderRadius : 24;

        this.octaves = 10;
        this.lacunarity = 1.6;
        this.gain = 0.7;
        this.frequency = 10;
        this.baseFlatness = 0;
        this.displacement = 60;
        this.borderOffset = 60;

        this.time = 0;
        this.lastFrameTime = 0;
        this.width = 0;
        this.height = 0;
        this.lastDpr = 1;
        this.animationFrameId = null;

        this.init();
      }

      updateSize() {
        const rect = this.container.getBoundingClientRect();
        const width = rect.width + this.borderOffset * 2;
        const height = rect.height + this.borderOffset * 2;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(dpr, dpr);

        this.width = width;
        this.height = height;
        this.lastDpr = dpr;
      }

      draw(currentTime) {
        if (!this.canvas || !this.ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (dpr !== this.lastDpr) {
          this.updateSize();
        }

        if (!this.lastFrameTime) this.lastFrameTime = currentTime;
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.time += deltaTime * this.speed;
        this.lastFrameTime = currentTime;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(dpr, dpr);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const left = this.borderOffset;
        const top = this.borderOffset;
        const borderWidth = this.width - 2 * this.borderOffset;
        const borderHeight = this.height - 2 * this.borderOffset;
        const maxRadius = Math.min(borderWidth, borderHeight) / 2;
        const radius = Math.min(this.borderRadius, maxRadius);

        const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
        const sampleCount = Math.floor(approximatePerimeter / 2);

        this.ctx.beginPath();

        for (let i = 0; i <= sampleCount; i++) {
          const progress = i / sampleCount;
          const point = getRoundedRectPoint(this, progress, left, top, borderWidth, borderHeight, radius);

          const xNoise = octavedNoise(this, progress * 8, this.time, 0);
          const yNoise = octavedNoise(this, progress * 8, this.time, 1);

          const displacedX = point.x + xNoise * this.displacement;
          const displacedY = point.y + yNoise * this.displacement;

          if (i === 0) {
            this.ctx.moveTo(displacedX, displacedY);
          } else {
            this.ctx.lineTo(displacedX, displacedY);
          }
        }

        this.ctx.closePath();
        this.ctx.stroke();

        this.animationFrameId = requestAnimationFrame((t) => this.draw(t));
      }

      init() {
        this.container.style.setProperty('--electric-border-color', this.color);
        this.container.style.setProperty('--border-radius', `${this.borderRadius}px`);

        this.updateSize();

        this.resizeObserver = new ResizeObserver(() => this.updateSize());
        this.resizeObserver.observe(this.container);

        this.animationFrameId = requestAnimationFrame((t) => this.draw(t));
      }

      destroy() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        if (this.resizeObserver) this.resizeObserver.disconnect();
      }
    }
