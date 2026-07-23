import { ZextraUI } from '../../../constructor/zextra-ui.js';
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
        this.scrollObserver = null;    
        this.activeLink = null;        
        this.isClickScrolling = false; // Flag to prevent observer interference on click

        this.append(this.toc_list);

        this.#init();
    }

    #getSelector() {
        if (Array.isArray(this.depth)) return this.depth.map(d => `h${d}`).join(', ');
        const max = Math.min(Math.max(this.depth, 1), 6);
        return Array.from({ length: max }, (_, i) => `h${i + 1}`).join(', ');
    }

    #setActiveLink(newActive) {
        if (!newActive) return;

        // Resolve raw HTML element if a ziko UIElement wrapper was passed
        const targetEl = newActive instanceof UIElement ? newActive.element : newActive;

        // Force remove active state and data-active attribute from ALL links in the TOC list
        const allLinks = this.toc_list.element.querySelectorAll('a');
        allLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('data-active');
        });

        // Set active attribute on the clicked/scrolled-to element
        targetEl.classList.add('active');
        targetEl.setAttribute('data-active', 'true');
        this.activeLink = targetEl;
    }

    #setupScrollObserver(headings) {
        if (this.scrollObserver) this.scrollObserver.disconnect();

        const linkMap = new Map();
        this.toc_list.element.querySelectorAll('a').forEach(anchor => {
            const id = anchor.getAttribute('href').slice(1);
            linkMap.set(id, anchor);
        });

        this.scrollObserver = new IntersectionObserver(
            (entries) => {
                // Ignore observer events triggered by anchor clicks
                if (this.isClickScrolling) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.id;
                        const newActive = linkMap.get(targetId);

                        if (newActive && newActive !== this.activeLink) {
                            console.log('Active TOC Section:', {
                                id: targetId,
                                text: newActive.textContent,
                                element: entry.target
                            });

                            this.#setActiveLink(newActive);
                        }
                    }
                });
            },
            {
                rootMargin: '-20% 0px -40% 0px',
                threshold: 0
            }
        );

        headings.forEach((heading) => this.scrollObserver.observe(heading));
    }

    #buildTOC() {
        const root = this.content ?? document.body;
        if (!root) return false; 

        const selector = this.#getSelector();
        const headings = root.querySelectorAll(selector);
        
        if (headings.length === 0) return false;

        this.toc_list.element.replaceChildren();

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
            
            const link = a({ href: `#${heading.id}` }, label);

            // Handle manual click explicitly
            link.on('click', (e) => {
                // Get the raw DOM element regardless of event wrapper structure
                const targetAnchor = e.target || e.currentTarget;

                this.#setActiveLink(targetAnchor);

                // Pause observer during scroll jump
                this.isClickScrolling = true;
                setTimeout(() => {
                    this.isClickScrolling = false;
                }, 800);
            });

            li({}, link)
            .style({
                marginLeft: `${relativeIndex * 15}px`
            })
            .mount(this.toc_list);
        });

        this.#setupScrollObserver(headings);

        return true; 
    }

    #init() {
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
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
            this.scrollObserver = null;
        }
    }

    refresh() {
        this.#buildTOC();
    }
}

export const TableOfContents = call_with_optional_props(UITableOfContents);


/*
data-visible="true" is applied to every heading currently visible in the viewport.
data-active="true" is applied exclusively to the topmost visible section (or the section manually clicked).
*/