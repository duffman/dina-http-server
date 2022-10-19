"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2021-10-14 13:39
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRouter = void 0;
var route_types_1 = require("@library/dina-http-server/types/route.types");
var path_utils_1 = require("@library/utils/path.utils");
var str_utils_1 = require("@library/utils/str.utils");
var ControllerRouter = /** @class */ (function () {
    function ControllerRouter(routerCore, controller) {
        this.routerCore = routerCore;
        this.controller = controller;
        this.basePath = "";
        this.routesInfo = new Array();
        this.router = routerCore.router;
    }
    ControllerRouter.prototype.havePath = function (path) {
        for (var _i = 0, _a = this.routesInfo; _i < _a.length; _i++) {
            var routerPath = _a[_i];
            console.log("comparing path :: ".concat(path, " :: with router path :: ").concat(routerPath.fullRoute));
            if (routerPath.fullRoute === path) {
                console.log("PATH FOUND!!!");
                return true;
            }
        }
        return false;
    };
    ControllerRouter.prototype.setBasePath = function (path) {
        path = str_utils_1.StrUtils.stripTrailingAndLeadingSlashes(path);
        this.basePath = "/".concat(path, "/");
    };
    ControllerRouter.prototype.get = function (route, func, noBasePath) {
        return this.registerRoute(route_types_1.RouteMethod.get, route, func, noBasePath);
    };
    ControllerRouter.prototype.post = function (route, func, noBasePath) {
        return this.registerRoute(route_types_1.RouteMethod.post, route, func, noBasePath);
    };
    ControllerRouter.prototype.delete = function (route, func, noBasePath) {
        return this.registerRoute(route_types_1.RouteMethod.delete, route, func, noBasePath);
    };
    ControllerRouter.prototype.all = function (route, func, noBasePath) {
        return this.registerRoute(route_types_1.RouteMethod.all, route, func, noBasePath);
    };
    ControllerRouter.prototype.registerRoute = function (method, route, func, noBasePath) {
        var _a, _b;
        route = path_utils_1.PathUtils.stripLeadingSlashes(route);
        if (!this.routerCore.router) {
            throw new Error("No router Assigned");
        }
        if (!this.controller) {
            throw new Error("No parent Assigned >>");
        }
        if (route === "/") {
            route = "";
        }
        //
        // Ignore base path for all
        //
        if (this.basePath && !noBasePath) {
            route = this.basePath + route;
        }
        if (!route.startsWith("/"))
            route = "/" + route;
        this.routesInfo.push({
            controllerName: (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.constructor.name) !== null && _b !== void 0 ? _b : "<NO_NAME>",
            method: method,
            fullRoute: route
        });
        try {
            switch (method) {
                case route_types_1.RouteMethod.get:
                    this.router.get(route, func.bind(this.controller));
                    break;
                case route_types_1.RouteMethod.post:
                    this.router.post(route, func.bind(this.controller));
                    break;
                case route_types_1.RouteMethod.delete:
                    this.router.delete(route, func.bind(this.controller));
                    break;
                case route_types_1.RouteMethod.all:
                    this.router.all(route, func.bind(this.controller));
                    break;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return ControllerRouter;
}());
exports.ControllerRouter = ControllerRouter;
//# sourceMappingURL=controller-router.js.map