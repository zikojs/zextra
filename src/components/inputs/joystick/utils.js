export const stepAlign = (val, min, step) => {
    const stepped = Math.round((val - min) / step) * step + min;
    return parseFloat(stepped.toFixed(2));
};


export const calculateScaledValues = (normX, normY, opts) => {
    const { xMin, xMax, yMin, yMax, dx, dy } = opts;
    const rawX = xMin + ((normX + 1) / 2) * (xMax - xMin);
    const rawY = yMin + (((-normY) + 1) / 2) * (yMax - yMin);

    return {
    x: stepAlign(rawX, xMin, dx),
    y: stepAlign(rawY, yMin, dy)
    };
};

export const clampCoordinates = (rawX, rawY, shape) => {
    if (shape === "square") {
    return {
        clampedX: Math.max(-1, Math.min(1, rawX)),
        clampedY: Math.max(-1, Math.min(1, rawY))
    };
    }
    
    const distance = Math.hypot(rawX, rawY);
    if (distance > 1) {
    return {
        clampedX: rawX / distance,
        clampedY: rawY / distance
    };
    }

    return { clampedX: rawX, clampedY: rawY };
};

export const getKeyboardDelta = (keys, stepX = 0.04, stepY = 0.04) => {
    let kx = 0;
    let ky = 0;

    if (keys.has("ArrowRight") || keys.has("KeyD")) kx += stepX;
    if (keys.has("ArrowLeft") || keys.has("KeyA")) kx -= stepX;
    if (keys.has("ArrowUp") || keys.has("KeyW")) ky -= stepY;
    if (keys.has("ArrowDown") || keys.has("KeyS")) ky += stepY;

    return { kx, ky };
};

export const createJoystickDOM = (opts) => {
    const container = document.createElement("div");
    container.className = "joystick-container";

    const label = document.createElement("span");
    label.className = "joystick-label";
    label.textContent = opts.label;

    const base = document.createElement("div");
    base.className = `joystick-base shape-${opts.shape}`;
    base.tabIndex = 0;
    base.role = "slider";
    base.setAttribute("aria-label", opts.label);

    const axisX = document.createElement("div");
    axisX.className = "joystick-axis-x";

    const axisY = document.createElement("div");
    axisY.className = "joystick-axis-y";

    const handle = document.createElement("div");
    handle.className = "joystick-handle";

    base.append(axisX, axisY, handle);

    const readout = document.createElement("div");
    readout.className = "joystick-values";

    container.append(label, base, readout);

    return { container, base, handle, readout };
};

export const renderJoystickUI = ({ handle, readout }, normX, normY, calculatedX, calculatedY, isAnimated) => {
    const maxPixelRadius = (140 - 50) / 2;
    const pxX = normX * maxPixelRadius;
    const pxY = normY * maxPixelRadius;

    const transition = isAnimated
    ? "transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
    : "";

    handle.style.cssText = `transform: translate3d(${pxX}px, ${pxY}px, 0); ${transition}`;
    readout.textContent = `X: ${calculatedX.toFixed(2)} | Y: ${calculatedY.toFixed(2)}`;
};

export const dispatchJoystickEvents = (targetNode, x, y, stateTracker) => {
    const xChanged = stateTracker.lastX !== x;
    const yChanged = stateTracker.lastY !== y;

    if (xChanged) {
        targetNode.dispatchEvent(new CustomEvent("x-change", { detail: { x }, bubbles: true }));
        stateTracker.lastX = x;
    }

    if (yChanged) {
        targetNode.dispatchEvent(new CustomEvent("y-change", { detail: { y }, bubbles: true }));
        stateTracker.lastY = y;
    }

    if (xChanged || yChanged) {
        targetNode.dispatchEvent(new CustomEvent("change", { detail: { x, y }, bubbles: true }));
    }
};

