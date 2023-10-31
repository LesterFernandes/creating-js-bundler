import {clonedeep} from "./clonedeep.js";

let obj = {
    a: 'aaa',
    b: {
        c: 'ccc'
    }
}
let clone = clonedeep(obj)
let copy = Object.assign({} ,obj)//{...obj}
console.log('after clone ',obj.b === clone.b)
console.log('after plain copy ',obj.b === copy.b)