import { ZextraUI } from '../../../constructor/zextra-ui.js';
import './index.css';
import { tags } from 'ziko/domm';
const { input, ul, li} = tags
export class UIAutocomplete extends ZextraUI{
    constructor({dataset = [], placeholder = 'Type something…'} = {}){
        super({element : 'div'})
        this.setAttr({
            class : 'zextra-autocomplete'
        })
        Object.assign(this.cache,{
            dataset : dataset,
            index : -1,
            filtred : []
        })
        this.style({
            width : '200px'
        })
        this.dataset = dataset;
        this.input = input({ type : 'text', placeholder});
        this.list = ul({})
        this.append(
            this.input,
            this.list
        )
        render_list.call(this);
        this.list.onClick(e=>{
            const li = e.event.target.closest("li");
            if(!li) return;
            const i = +li.dataset.index;
            set_value.call(this, this.cache.filtred[i])
        });
        this.input.element.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase()

            this.cache.filtred = value
            ? this.dataset.filter(item => item.toLowerCase().includes(value))
            : []

            // console.log(this.cache.filtred)

            render_list.call(this)
        })
    }
}

function render_list(){
    if(!this.cache.filtred.length){
        this.list.innerHTML = "";
        // this.list.setAttr({hidden : true});
        this.cache.index = -1;
        return;
    }
    this.list.clear()
    this.cache.filtred.forEach((item, i)=>{
        const el = li({'data-index' : i}, item);
        globalThis.el = el
        this.list.append(el)
    }) 

    this.cache.index = -1;
    // this.list.setAttr({hidden : false});
}

function set_value(value) {
    this.input.element.value = value;
    // this.list.setAttr({ hidden : true})
}

export const Autocomplete = ({dataset, placeholder}) => new UIAutocomplete({dataset, placeholder})