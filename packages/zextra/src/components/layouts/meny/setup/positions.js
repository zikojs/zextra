export function setup_positions() {
    this.cache.transform.menu_opened = '';
    this.cache.transform.contents_closed = '';
    const menuAngle = this.cache.config.angle;
    const contentsAngle = this.cache.config.angle / -2;
    switch(this.cache.config.position) {
        case 'top': Object.assign(this.cache.transform, {
                    menu_origin : '50% 0%',
                    menu_closed : `rotateX(${menuAngle}deg) translateY(-100%) translateY(${this.cache.config.overlap}px)`,
                    contents_origin : '50% 0',
                    contents_opened : `translateY(${this.cache.config.height}px) rotateX(${contentsAngle}deg)`
                }); break;
        case 'right': Object.assign(this.cache.transform, {
                    menu_origin : '100% 50%',
                    menu_closed : `rotateY(${menuAngle}deg) translateX(100%) translateX(-2px) scale(1.01)`,
                    contents_origin : '100% 50%',
                    contents_opened : `translateX(-${this.cache.config.width}px) rotateY(${contentsAngle}deg)`
                }); break;
        case 'bottom': Object.assign(this.cache.transform, {
                    menu_origin : '50% 100%',
                    menu_closed : `rotateX(${-menuAngle}deg) translateY(100%) translateY(-${this.cache.config.overlap}px)`,
                    contents_origin : '50% 100%',
                    contents_opened : `translateY(-${this.cache.config.height}px) rotateX(${-contentsAngle}deg)`
                }); break;
        default: Object.assign(this.cache.transform, {
                    menu_origin : '100% 50%',
                    menu_closed : `translateX(-100%) translateX(${this.cache.config.overlap}px) scale(1.01) rotateY(${-menuAngle}deg)`,
                    contents_origin : '0 50%',
                    contents_opened : `translateX(${this.cache.config.width}px) rotateY(${-contentsAngle}deg)`
                }); break;
    }
}