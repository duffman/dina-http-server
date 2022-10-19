"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-09 16:52
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoint = void 0;
//declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
function endpoint(endpointInfo) {
    return function (target, propertyKey, descriptor) {
        console.log("META TARGET ::", target);
        console.log("META propertyKey ::", propertyKey);
        console.log("META descriptor ::", descriptor);
        //descriptor: TypedPropertyDescriptor<(... p:any[]) => Promise<any>>
        Reflect.defineMetadata(
        // this here is to reference the data later when we retrieve it.
        propertyKey, __assign(__assign({}, Reflect.getMetadata(propertyKey, target)), { 
            // then we append whatever else we need
            data: {
                name: propertyKey,
                endpointInfo: endpointInfo
            } }), target);
        return descriptor;
    };
}
exports.endpoint = endpoint;
//# sourceMappingURL=endpoint.decorator.js.map