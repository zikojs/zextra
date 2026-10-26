import {tags, UIElement, call_with_optional_props} from 'ziko/dom'

const { div } = tags;

export class UIPixelImage extends UIElement{
    constructor({
        src,
        width = 400,
        height = 300,
        rows = 4,
        cols = 4,
        grayscaleAnimation = true,
        pixelFadeInDuration = 500,
        maxAnimationDelay = 1200,
        colorRevealDelay = 400
    } = {}){
        super({element : 'div'})
        this.config = {
            width,
            height,
            src,
            rows,
            cols,
            grayscaleAnimation,
            pixelFadeInDuration,
            maxAnimationDelay,
            colorRevealDelay
        }
        this.setAttr({class : 'pixel-image-container'});


        this.play();
    }

    play(){
        this.clear();
        const {
            rows, 
            cols, 
            width, 
            height, 
            src,
            grayscaleAnimation,
            pixelFadeInDuration,
            maxAnimationDelay,
            colorRevealDelay
        } = this.config;
        this.style({
            width: `${width}px`, 
            height: `${height}px`, 
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`
        })
        for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Compute background position offsets for grid positioning
          const bgX = (c / (cols - 1)) * 100;
          const bgY = (r / (rows - 1)) * 100;

          const tile = div({
            class: `pixel-tile ${!grayscaleAnimation ? 'color-active' : ''}`,
          }).style({
                backgroundImage:  `url("${src}")`,
                backgroundSize: `${width}px ${height}px`,
                backgroundPosition: `${bgX}% ${bgY}%`,
                transitionDuration: `${pixelFadeInDuration}ms`
          });

          // Randomize reveal staggering delays
          const revealDelay = Math.random() * maxAnimationDelay;

          setTimeout(() => {
            tile.element.classList.add("visible");

            if (grayscaleAnimation) {
              setTimeout(() => {
                tile.element.classList.add("color-active");
              }, colorRevealDelay);
            }
          }, revealDelay);

          this.append(tile);
        }
      }
        
    }
}

export const PixelImage  = call_with_optional_props(UIPixelImage);