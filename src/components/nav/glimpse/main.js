import { 
    tags, 
    UIElement,
    call_with_optional_props
} from 'ziko/dom';

const {  div, img, span } = tags;

export class UIGlimpse extends UIElement{
    constructor({
        url = 'https://github.com', 
        target = '_blank', 
        title, 
        description, 
        image,
        delay = 180
    } = {}, ...items){
        super({ element : 'a'})
        // this.link = a({class : 'glimpse-link', url, target}, ...items);

        this.config = {
            url,
            title,
            description,
            image, 
            delay,
        }
        
        this.setAttr({ class : 'glimpse-link', href : url, target});
        this.append(...items)

        

        this.activeTarget = null;
        this.showTimer = null;
        this.hideTimer = null;
        this.delay = 180; // Delay before showing (ms)

        this.setup();
    }
    setup(){
        this.#renderCard()
        // this.onPtrEnter(()=> console.log('Enter ...'))
        this.on('pointerenter', () => this.#handleEnter())
        this.on('pointerleave', () => this.#handleLeave())
    }

    #renderCard(){
        if(this?.g_card) this.g_card.unmount();
        // Should Destroy All events 
        
        const parsed_url = new URL(this.config.url);
        const image_url = this.config.image || `https://api.microlink.io/?url=${encodeURIComponent(this.config.url)}&embed=screenshot.url`;

        this.g_skeleton = div({class  : "glimpse-skeleton"});
        this.g_image = img(
            {
                class : 'glimpse-image', 
                src : this.config.image, 
                alt : 'URL Preview'
            }
        )
        .on('load', ()=> this.g_skeleton.style({display : 'none'}))
        .on('error', ()=> this.g_skeleton.style({display : 'none'}));
        
        // .style({ opacity : 1});
        this.g_image_wrapper = div(
            { class : 'glimpse-image-wrapper'},
            this.g_skeleton,
            this.g_image
        );

        this.g_favicon = img({ class : 'glimpse-favicon', src : '', alt : '' });
        this.g_domain = span(
            { class : 'glimpse-domain'},
            parsed_url.hostname
        );
        this.g_header = div(
            { class : 'glimpse-header'},
            this.g_favicon,
            this.g_domain
        );

        this.g_title = div(
            { class : 'glimpse-title'},
            this.config.title || parsed_url.hostname
        );
        this.g_description = div(
            { class : 'glimpse-description'},
            this.config.description || this.config.url
        );
        
        this.g_content = div(
            { class : 'glimpse-content'},
            this.g_header,
            this.g_title,
            this.g_description
        )

        this.g_card = div(
            { class : 'glimpse-card', role : 'tooltip'}, 
            this.g_image_wrapper,
            this.g_content,
        )

        this.g_card.mount(document.body);

    }

    #positionCard(){
        const rect = this.element.getBoundingClientRect(); 
        const cardRect = this.g_card.element.getBoundingClientRect();

        const padding = 12;
        let top = rect.top - cardRect.height - padding;
        let left = rect.left + (rect.width / 2) - (cardRect.width / 2);

        if (top < padding) top = rect.bottom + padding;
        if (left < padding) left = padding;
        else if (left + cardRect.width > window.innerWidth - padding) {
          left = window.innerWidth - cardRect.width - padding;
        }

        this.g_card.style({
            top : `${top}px`,
            left : `${left}px`
        })
    }

    #handleEnter(){
        clearTimeout(this.hideTimer);
        this.showTimer = setTimeout(() => {
          this.#positionCard();
          this.g_card.element.classList.add('visible');
        }, this.config.delay);
    }
    #handleLeave(){
        clearTimeout(this.showTimer);
        this.hideTimer = setTimeout(() => this.g_card.element.classList.remove('visible'), 150);
    }
}

export const Glimpse = call_with_optional_props(UIGlimpse);
