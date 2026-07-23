import {
    UIElement, 
    tags,
    call_with_optional_props
} from 'ziko/dom'

import {
    stepAlign,
    calculateScaledValues,
    clampCoordinates,
    getKeyboardDelta,
    createJoystickDOM,
    renderJoystickUI,
    dispatchJoystickEvents
} from './utils.js'

const {span, div} = tags;


class UIJoystick extends UIElement{
    constructor({
        label = "2D Joystick",
        shape = "circle",
        xMin = -1,
        xMax = 1,
        yMin = -1,
        yMax = 1,
        dx = 0.01,
        dy = 0.01,
        autoCenter = true,
    } = {}) {
    super({element : 'div'});
    this.settings = {
        label : "2D Joystick",
        shape : "circle",
        xMin : -1,
        xMax : 1,
        yMin : -1,
        yMax : 1,
        dx : 0.01,
        dy : 0.01,
        autoCenter : true,
    };

    // this.settings = {
    //     xMin,
    //     xMax,
    //     yMin,
    //     yMax,
    //     dx,
    //     dy,
    //     autoCenter,
    // }

    this.setAttr({class : 'zextra joystick-container'});
    this.label_ui = span({class : 'zextra joystick-label'}, label);
    this.handle_ui = div({class : 'zextra joystick-handle'});
    this.base_ui = div(
        {
            class : `zextra joystick-base shape-${shape}`,
            'tab-index' : 0,
            role : 'slider',
            'aria-label' : label,
        },
        div({class : 'zextra joystick-axis-x'}),
        div({class : 'zextra joystick-axis-y'}),
        this.handle_ui
    );
    this.readout_ui = div({class : 'zextra joystick-values'})
    this.append(
        span({class : 'zextra joystick-label'}, label),
        this.base_ui,
        this.readout_ui 
    )

    this.normX = 0;
    this.normY = 0;
    this.eventTracker = { lastX: null, lastY: null };
    this.isDragging = false;
    this.activeKeys = new Set();
    this.keyLoopId = null;

    
    
    this.base = this.base_ui.element;
    this.domRefs = { handle : this.handle_ui.element, readout : this.readout_ui.element };

    this._bindEvents();
    this._updatePosition(0, 0);
    }

    _updatePosition(rawNormX, rawNormY) {
    const { clampedX, clampedY } = clampCoordinates(rawNormX, rawNormY, this.settings.shape);

    this.normX = clampedX;
    this.normY = clampedY;

    const { x, y } = calculateScaledValues(clampedX, clampedY, this.settings);
    const isAnimated = !this.isDragging && this.activeKeys.size === 0 && this.settings.autoCenter;

    renderJoystickUI(this.domRefs, clampedX, clampedY, x, y, isAnimated);
    dispatchJoystickEvents(this.element, x, y, this.eventTracker);
    }

    _bindEvents() {
    // Pointer Input Handler
    this.base.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.base.focus();
        this.isDragging = true;
        this.base.setPointerCapture(e.pointerId);

        const rect = this.base.getBoundingClientRect();
        const radius = rect.width / 2;
        const centerX = rect.left + radius;
        const centerY = rect.top + radius;

        const onPointerMove = (moveEvt) => {
        if (!this.isDragging) return;
        moveEvt.preventDefault();

        const rawNormX = (moveEvt.clientX - centerX) / radius;
        const rawNormY = (moveEvt.clientY - centerY) / radius;

        this._updatePosition(rawNormX, rawNormY);
        };

        const onPointerUp = (upEvt) => {
        this.isDragging = false;

        if (this.base.hasPointerCapture(upEvt.pointerId)) {
            this.base.releasePointerCapture(upEvt.pointerId);
        }

        if (this.settings.autoCenter) {
            this._updatePosition(0, 0);
        }

        this.base.removeEventListener("pointermove", onPointerMove);
        this.base.removeEventListener("pointerup", onPointerUp);
        this.base.removeEventListener("pointercancel", onPointerUp);
        };

        onPointerMove(e);

        this.base.addEventListener("pointermove", onPointerMove);
        this.base.addEventListener("pointerup", onPointerUp);
        this.base.addEventListener("pointercancel", onPointerUp);
    });

    // Keyboard Animation Loop Handler
    const processKeyLoop = () => {
        if (this.activeKeys.size === 0) {
        if (this.keyLoopId) {
            cancelAnimationFrame(this.keyLoopId);
            this.keyLoopId = null;
        }
        if (this.settings.autoCenter) this._updatePosition(0, 0);
        return;
        }

        const { kx, ky } = getKeyboardDelta(this.activeKeys);
        if (kx !== 0 || ky !== 0) this._updatePosition(this.normX + kx, this.normY + ky);
    
        this.keyLoopId = requestAnimationFrame(processKeyLoop);
    };

    this.base.addEventListener("keydown", (e) => {
        const validKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "KeyW", "KeyA", "KeyS", "KeyD"];
        if (validKeys.includes(e.code) || validKeys.includes(e.key)) {
        e.preventDefault();
        this.activeKeys.add(e.code || e.key);

        if (!this.keyLoopId) {
            this.keyLoopId = requestAnimationFrame(processKeyLoop);
        }
        }
    });

    this.base.addEventListener("keyup", (e) => {
        this.activeKeys.delete(e.code || e.key);
    });

    this.base.addEventListener("blur", () => {
        this.activeKeys.clear();
        if (this.settings.autoCenter) {
        this._updatePosition(0, 0);
        }
    });
    }
}


export const Joystick = call_with_optional_props(UIJoystick)
