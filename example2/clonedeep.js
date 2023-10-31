export const clonedeep = (val) => {
    function makeClone(obj, newObj){
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                newObj[key] = {}
                makeClone(obj[key], newObj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }

    const newVal = {}
    makeClone(val, newVal)
    return newVal;
}