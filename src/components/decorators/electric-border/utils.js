// Pseudo-random number generator loop
export function random(context, x) {
  return (Math.sin(x * 12.9898) * 43758.5453) % 1;
}

// 2D Value Noise engine logic
export function noise2D(context, x, y) {
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

// Fractal Brownian Motion calculation Loop
export function octavedNoise(context, x, time, seed) {
  let y = 0;
  let amplitude = context.settings.chaos;
  let frequency = context.settings.frequency;

  for (let i = 0; i < context.settings.octaves; i++) {
    let octaveAmplitude = amplitude;
    if (i === 0) {
      octaveAmplitude *= context.settings.baseFlatness;
    }
    y += octaveAmplitude * noise2D(context, frequency * x + seed * 100, time * frequency * 0.3);
    frequency *= context.settings.lacunarity;
    amplitude *= context.settings.gain;
  }
  return y;
}

export function getCornerPoint(context, centerX, centerY, radius, startAngle, arcLength, progress) {
  const angle = startAngle + progress * arcLength;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}

export function getRoundedRectPoint(context, t, left, top, width, height, radius) {
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
