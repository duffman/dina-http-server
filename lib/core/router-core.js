"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>

 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterCore = void 0;
var dina_common_1 = require("dina-common");
var utils_1 = require("dina-common/utils");
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var controller_router_1 = require("./controller-router");
var RouterCore = /** @class */ (function () {
    function RouterCore() {
        this.parent = undefined;
        this.basePath = undefined;
        this.router = (0, express_1.Router)();
        this.routesInfo = new Array();
        this.controllerRoutes = new Map();
        /**
         * Save route information
         * @param {RouteMethod} method
         * @param {string} route
         *
        private addRouteInfo(method: RouteMethod, route: string): void {
            const name = this.parent.constructor.name;
    
            this.routesInfo.push(
                {
                    controllerName: name,
                    method        : method,
                    fullRoute     : route
                });
        }
         */
    }
    /**
     * Assign Express Router
     * @param {e.Router} router
     */
    RouterCore.prototype.setRouter = function (router) {
        this.router = router;
    };
    RouterCore.prototype.assignObject = function (parent) {
        this.parent = parent;
        this.basePath = "";
        var keys = Reflect.getMetadataKeys(parent);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var data = Reflect.getMetadata(key, parent);
            console.log(">>> META DATA ::", data);
            var endpointInfo = data;
            if (endpointInfo) {
            }
        }
        //this.parseMetaData(data);
        // then we loop through to get that keys data,
        keys.forEach(function (k) {
            var data = Reflect.getMetadata(k, parent);
            if (data) {
            }
        });
    };
    RouterCore.prototype.assignParent = function (controller) {
        this.parent = controller;
        this.basePath = "";
    };
    /**
     * Add single controller
     * @param {IDinaController} controller
     * @returns {boolean}
     */
    RouterCore.prototype.addController = function (controller) {
        try {
            var controllerRouter = this.assignController(controller);
            controller.initRoutes(controllerRouter);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    RouterCore.prototype.assignController = function (controller) {
        var _this = this;
        var controllerRouter = new controller_router_1.ControllerRouter(this, controller);
        this.controllerRoutes.set(controller, controllerRouter);
        var keys = Reflect.getMetadataKeys(controller);
        // then we loop through to get that keys data,
        keys.forEach(function (k) {
            var data = Reflect.getMetadata(k, controller);
            if (data) {
                _this.parseMetaData(data, controllerRouter);
            }
        });
        return controllerRouter;
    };
    /**
     * Set the servers absolute url to allow
     * links to appear when listing paths
     * @param {string} absUrl
     */
    RouterCore.prototype.setSetAbsoluteBaseUrl = function (absUrl) {
        this.absoluteBaseUrl = utils_1.UrlUtils.stripTrailingSlashes(absUrl);
    };
    RouterCore.prototype.parseMetaData = function (metaData, router) {
        var _a;
        console.log("META DATD ::::", metaData);
        var decorationData = metaData;
        /*
         const magicWand: { [K: string]: Function } = {
         Foo: newItemFoo,
         Bar: newItemBar,
         xxx: newItemXXX,   // this allows you to use a different value for the argument
         yyy: newItemXXX,   // ... to use multiple names for the same function
         // ... and to handle gracefully the calls of non-existing functions
         };
         */
        var endpointData = decorationData ? decorationData.endpointData : null;
        if (decorationData && (endpointData.method || endpointData.path)) {
            var route = (_a = endpointData.path) !== null && _a !== void 0 ? _a : decorationData.methodName;
            router.registerRoute(endpointData.method, route, function (req, res) {
                res.json({
                    decorated: "action"
                });
            });
        }
        else {
            throw new Error("Invalid decorator :: unable to resolve path");
        }
        console.log("parseMetaData :: parseMetaData ::", metaData === null || metaData === void 0 ? void 0 : metaData.data);
    };
    /**
     * Check whether a given path have
     * been registered by a controller
     * @param {string} path
     * @returns {boolean}
     */
    RouterCore.prototype.havePath = function (path) {
        for (var _i = 0, _a = this.routesInfo; _i < _a.length; _i++) {
            var routerPath = _a[_i];
            dina_common_1.DLog.debug("comparing path :: ".concat(path, " :: with router path :: ").concat(routerPath.fullRoute));
            if (routerPath.fullRoute === path) {
                dina_common_1.DLog.info("PATH FOUND!!!");
                return true;
            }
        }
        return false;
    };
    RouterCore.prototype.setBasePath = function (path) {
        path = utils_1.UrlUtils.stripTrailingAndLeadingSlashes(path);
        this.basePath = "/".concat(path, "/");
    };
    /*
     public get(route: string, func: Function, noBasePath?: boolean): boolean {
     return this.registerRoute(RouteMethod.get, route, func, noBasePath);
     }

     public post(route: string, func: Function, noBasePath?: boolean): boolean {
     return this.registerRoute(RouteMethod.post, route, func, noBasePath);
     }

     public delete(route: string, func: Function, noBasePath?: boolean): boolean {
     return this.registerRoute(RouteMethod.delete, route, func, noBasePath);
     }

     public all(route: string, func: Function, noBasePath?: boolean): boolean {
     return this.registerRoute(RouteMethod.all, route, func, noBasePath);
     }

     public registerRoute(
     method: RouteMethod,
     route: string,
     func: Function,
     noBasePath?: boolean
     ): boolean {
     route = PathUtils.stripLeadingSlashes(route);

     if (!this.router) {
     throw new Error("No router Assigned");
     }

     if (!this.parent) {
     throw new Error("No parent Assigned");
     }

     //console.log("route ::", route);
     //console.log("this.basePath ::", this.basePath);

     if (route === "/") {
     route = "";
     }

     //
     // Ignore base path for all
     //
     if (this.basePath && !noBasePath) {
     route = this.basePath + route;
     }

     if (!route.startsWith("/")) route = "/" + route;

     this.addRouteInfo(method, route);

     //console.log("Final route ::", JSON.stringify(route));

     try {
     switch (method) {
     case RouteMethod.get:
     this.router.get(route, func.bind(this.parent));
     break;

     case RouteMethod.post:
     this.router.post(route, func.bind(this.parent));
     break;

     case RouteMethod.delete:
     this.router.delete(route, func.bind(this.parent));
     break;

     case RouteMethod.all:
     this.router.all(route, func.bind(this.parent));
     break;
     }
     }
     catch (e) {
     return false;
     }

     return true;
     }
     */
    RouterCore.prototype.showInfo = function (host, port) {
        var routeInfoTable = [];
        for (var _i = 0, _a = this.routesInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            if (host)
                host = host === "0.0.0.0" ? "localhost" : host;
            routeInfoTable.push({
                controller: info.controllerName,
                method: info.method,
                route: info.fullRoute,
                url: "http://".concat(host, ":").concat(port).concat(info.fullRoute)
            });
        }
        console.table(routeInfoTable);
    };
    RouterCore = __decorate([
        (0, tsyringe_1.singleton)()
    ], RouterCore);
    return RouterCore;
}());
exports.RouterCore = RouterCore;
//# sourceMappingURL=router-core.js.map