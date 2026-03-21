import { UIElement } from 'ziko/dom'
// import { add_vendor_prefix } from 'ziko/dom/utils/index.js'
// import { register_click_away_event } from 'ziko/events/custom-events/click-away.js'
// import { register_swipe_event } from 'ziko/events/custom-events/swipe.js'
import { 
    add_class,
    remove_class
 } from './utils/index.js'
import {
	setup_positions
} from './setup/index.js'
class UIMeny extends UIElement {
    constructor(menu, contents, {
			width= 300,
			height= 300,
			position= UIMeny.POSITION_L,
			threshold= 40,
			angle= 30,
			overlap= 6,
			transitionDuration= '0.5s',
			transitionEasing= 'ease',
			gradient= 'rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.65) 100%)',		
	}= {}
    ){
        super({element : 'div', name : 'meny'})
        this.menu = menu.style({
				opacity : 0
		});
		add_class(this.menu.element, 'zextra-meny')
        this.contents = contents
        this.cover = null
        this.dom = {
            menu : menu.element,
            contents : contents.element,
            wrapper : this.element
        }
		// register_click_away_event(this.dom.menu)
		this.dom.menu.addEventListener('clickaway', ()=> this.close())

		// register_swipe_event(this.dom.wrapper)
		this.dom.wrapper.addEventListener('swiperight', ()=> {
			console.log(this.isOpen())
			setTimeout(()=>this.open(), 0)
			console.log('Open ...')
		})
		this.dom.wrapper.addEventListener('dblclick', ()=> this.toggle())
		this.dom.wrapper.style.border = '2px red solid'
		this.style({
			userSelect: 'none',
      		touchAction: 'none'
		})
		this.append(menu, contents)
        Object.assign(this.cache, {
			config : {
				width,
				height,
				position,
				threshold,
				angle,
				overlap,
				transitionDuration,
				transitionEasing,
				gradient,
			},
			state : {
				is_open : false,
			},
			transform : {
				menu_origin : '',
				menu_closed : '',
				menu_opened : '',
				contents_origin : '',
				contents_closed : '',
				contents_opend : ''
			}})
        this.originalStyles = {};
		this.init();
    }
    init() {
		setup_positions.call(this)
		this.setupWrapper();
		this.setupCover();
		this.setupMenu();
		this.setupContents();
	}
    setupWrapper() {
		add_class(this.dom.wrapper, `zextra-meny-${this.cache.config.position}`);
		this.originalStyles.wrapper = this.dom.wrapper.style.cssText;
		// this.dom.wrapper.style[add_vendor_prefix('perspective')] = '800px';
		// this.dom.wrapper.style[add_vendor_prefix('perspectiveOrigin')] = this.cache.transform.contents_origin;
	}
	setupCover() {
		if(this.dom.cover) this.dom.cover.parentNode.removeChild(this.dom.cover);
		this.dom.cover = document.createElement('div');
		Object.assign(this.dom.cover.style, {
			position: 'absolute',
			display: 'block',
			width: '100%',
			height: '100%',
			left: '0',
			top: '0',
			zIndex: '1000',
			visibility: 'hidden',
			opacity: '0',
			[add_vendor_prefix('transition')] : `all ${this.cache.config.transitionDuration} ${this.cache.config.transitionEasing}`

		});
		this.dom.contents.appendChild(this.dom.cover);
	}
	setupMenu() {
		switch(this.cache.config.position) {
			case 'top': Object.assign(this.dom.menu.style, {
				width : '100%',
				height : `${this.cache.config.height}px`
			}); break;
			case 'right': Object.assign(this.dom.menu.style, {
				right : '0',
				width : `${this.cache.config.width}px`,
				height : '100%'
			}); break;
			case 'bottom': Object.assign(this.dom.menu.style, {
				bottom : '0',
				width : '100%',
				height : `${this.cache.config.height}px`
			}); break;
			case 'left': Object.assign(this.dom.menu.style,{
				width : `${this.cache.config.width}px`,
				height : '100%'
			}); break;
		}
		this.originalStyles.menu = this.dom.menu.style.cssText;
		Object.assign(this.dom.menu.style, {
			position: 'fixed',
			display: 'block',
			zIndex: '1'
		});
		this.dom.menu.style[add_vendor_prefix('transform')] = this.cache.transform.menu_closed;
		this.dom.menu.style[add_vendor_prefix('transformOrigin')] = this.cache.transform.menu_origin;
		this.dom.menu.style[add_vendor_prefix('transition')] = `all ${this.cache.config.transitionDuration} ${this.cache.config.transitionEasing}`;
	}
	setupContents() {
		const style = this.dom.contents.style;
		this.originalStyles.contents = style.cssText;
		Object.assign(this.dom.contents.style,{
			[add_vendor_prefix('transform')] : this.cache.transform.contents_closed,
			[add_vendor_prefix('transformOrigin')] : this.cache.transform.contents_origin,
			[add_vendor_prefix('transition')] : `all ${this.cache.config.transitionDuration} ${this.cache.config.transitionEasing}`
		})
	}
	open() {
		if(!this.isOpen()) {
			this.cache.state.is_open = true;
			add_class(this.dom.wrapper, 'zextra-meny-active');
			this.dom.cover.style.height = `${this.dom.contents.scrollHeight}px`;
			this.dom.cover.style.visibility = 'visible';
			this.dom.cover.style.opacity = '1';
			this.dom.contents.style[add_vendor_prefix('transform')] = this.cache.transform.contents_opened;
			this.dom.menu.style[add_vendor_prefix('transform')] = this.cache.transform.menu_opened;

			this.menu.style({
				opacity : 1
			})
		}
	}
	close() {
		if(this.isOpen()) {
			this.cache.state.is_open = false;
			remove_class(this.dom.wrapper, 'zextra-meny-active');
			this.dom.cover.style.visibility = 'hidden';
			this.dom.cover.style.opacity = '0';
			this.dom.contents.style[add_vendor_prefix('transform')] = this.cache.transform.contents_closed;
			this.dom.menu.style[add_vendor_prefix('transform')] = this.cache.transform.menu_closed;

			this.menu.style({
				opacity : 0
			})
		}
	}
	toggle(){
		this.isOpen() ? this.close() : this.open();
		return this;
	}
	isOpen() {
		return this.cache.state.is_open;
	}
    
}
const Meny = (menu, contents, options) => new UIMeny(menu, contents, options)
export{
    UIMeny,
    Meny
}