"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmApiGet = exports.TypeRestrictedMethodDecorator = exports.ActionMethod = exports.DinaController = exports.ApiController = void 0;
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>

 */
var action_result_1 = require("@core/action-result");
// TypedPropertyDescriptor<(... p:any[]) => Promise<any>>
function ApiController(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.ApiController = ApiController;
function DinaController(basePath) {
    return function (constructor) {
        constructor.prototype.basePath = basePath;
        Reflect.set(constructor, "isCmApiController", true);
        console.log("AAAL ::", Reflect.getMetadataKeys(constructor));
        var keys = Reflect.getOwnMetadataKeys(constructor);
        console.log("MY KEYS::", keys);
    };
}
exports.DinaController = DinaController;
function ActionMethod(params) {
    return function (target, key, descriptor) {
        var originalValue = descriptor.value;
        Object.defineProperty(descriptor.value, "result", {
            writable: true,
            enumerable: true,
            value: new action_result_1.ActionResult()
        });
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //result = new ActionResult();
            // "this" here will refer to the class instance
            console.log("in property:: ", this.constructor.name);
            //Reflect.defineMetadata(key, mVal, this);
            //Reflect.defineMetadata("kalle", mVal, this);
            //return originalValue.apply(this, args);
        };
        //Reflect.defineMetadata("kalle", mVal, target);
        //Reflect.set(target, key, mVal)
        console.log("CmApiGet ::", key);
        return descriptor;
    };
}
exports.ActionMethod = ActionMethod;
function TypeRestrictedMethodDecorator(target, // The prototype of the class
propertyKey, // The name of the method
descriptor) {
    console.log("TypeRestrictedMethodDecorator called on: ", target, propertyKey, descriptor);
}
exports.TypeRestrictedMethodDecorator = TypeRestrictedMethodDecorator;
function CmApiGet(path, omitBasePath) {
    return function (target, key, descriptor) {
        var originalValue = descriptor.value;
        var mVal = { path: path, omitBasePath: omitBasePath };
        //Object.defineProperty<>()
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // "this" here will refer to the class instance
            console.log("in property:: ", this.constructor.name);
            Reflect.defineMetadata(key, mVal, this);
            Reflect.defineMetadata("kalle", mVal, this);
            return originalValue.apply(this, args);
        };
        Reflect.defineMetadata("kalle", mVal, target);
        Reflect.set(target, key, mVal);
        console.log("CmApiGet ::", key);
        return descriptor;
    };
}
exports.CmApiGet = CmApiGet;
//# sourceMappingURL=api-decorator.js.map