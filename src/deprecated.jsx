import Helpers from './_helper'

function _descriptorHandler(key, descriptor, input) {
    var method = descriptor.value;

    descriptor.value = function(...args) {
        console.warn(`${key} is deprecated. ${input}`)
        return method.apply(this, args)
    }

    return descriptor
}

function handleClass(target: Function, input) {

    Helpers.forEachClassOwnKeys(target, function(key) {

        if(typeof target.prototype[key] === "function") {
            var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key)

            descriptor = _descriptorHandler(key, descriptor, input)

            Object.defineProperty(target.prototype, key, descriptor)
        }
    })

    return target
}

function handleMethod(target: Function, key: String, descriptor, input) {

    return _descriptorHandler(key, descriptor, input)
}

function handleProp(target: Function, key: String, descriptor, input) {
    console.warn(`@deprecated should not set on class properties.`)
    return descriptor
}

function deprecated(input = '') {

    if(typeof input !== "string") {
        Helpers.wrongInput('deprecated', 'string', input)
        return;
    }

    return function(...args) {
        Helpers.handler(args, input, handleClass, handleMethod, handleProp)
    }
}
export default deprecated