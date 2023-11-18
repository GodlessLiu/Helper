import { mountedOverlaySvg } from "./overlay";

export interface Option{
    selector:string
}

export default class Helper {
    constructor(options:Option){
        console.log('Helper', options);
        const element = document.querySelector(options.selector)
        mountedOverlaySvg(element)        
    }
}