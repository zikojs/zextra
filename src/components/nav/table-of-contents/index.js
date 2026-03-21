import { ZextraUI } from '../../../constructor/zextra-ui.js';
import './index.css';
import { tags, call_with_optional_props, UIElement } from 'ziko/dom';

const { ul, li, a } = tags;

export class UITableOfContents extends ZextraUI {
    constructor({ content = document.body, depth = 6, labelFn } = {}) {
        super({ element: 'nav' });

        this.setAttr({
            class: 'zextra-toc'
        });

        this.content = content instanceof UIElement ? content.element : content;
        this.toc_list = ul();
        this.depth = depth;
        this.labelFn = labelFn;
        this.observer = null;

        this.append(this.toc_list);

        this.#init();
    }

    #getSelector() {
        if (Array.isArray(this.depth)) return this.depth.map(d => `h${d}`).join(', ');
        const max = Math.min(Math.max(this.depth, 1), 6);
        return Array.from({ length: max }, (_, i) => `h${i + 1}`).join(', ');
    }

    #buildTOC() {
        const root = this.content ?? document.body;
        if (!root) return false; 

        const selector = this.#getSelector();
        const headings = root.querySelectorAll(selector);
        
        if (headings.length === 0) return false;

        // Clear existing items
        this.toc_list.element.replaceChildren();

        // Normalize depth into ordered array (once, outside loop)
        const levels = Array.isArray(this.depth)
            ? [...this.depth].sort((a, b) => a - b)
            : Array.from({ length: this.depth }, (_, i) => i + 1);

        headings.forEach((heading, i) => {
            if (!heading.id) heading.id = `heading-${i + 1}`;
            const level = parseInt(heading.tagName[1]);
            const relativeIndex = levels.indexOf(level);
            const label = this.labelFn
                ? this.labelFn(heading, level)
                : heading.textContent;
            
            li({},
                a({ href: `#${heading.id}` }, label)
            )
            .style({
                marginLeft: `${relativeIndex * 15}px`
            })
            .mount(this.toc_list);
        });

        return true; 
    }

    #init() {
        // Try building immediately
        const success = this.#buildTOC();

        if (!success) {
            this.observer = new MutationObserver(() => {
                if (this.#buildTOC()) {
                    this.observer?.disconnect();
                    this.observer = null;
                }
            });

            const startObserving = () => {
                const root = this.content ?? document.body;
                if (root) {
                    this.observer.observe(root, { 
                        childList: true, 
                        subtree: true 
                    });
                } else {
                    document.addEventListener('DOMContentLoaded', () => {
                        const target = this.content ?? document.body;
                        if (target) {
                            this.observer?.observe(target, { 
                                childList: true, 
                                subtree: true 
                            });
                        }
                    }, { once: true });
                }
            };
            startObserving();
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        // super.destroy?.();
    }

    refresh() {
        this.#buildTOC();
    }
}

export const TableOfContents = call_with_optional_props(UITableOfContents);