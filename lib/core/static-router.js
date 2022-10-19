"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticRouter = void 0;
var express_1 = require("express");
var StaticRouter = /** @class */ (function () {
    function StaticRouter() {
        this.routes = (0, express_1.Router)();
        if (StaticRouter._instance) {
            throw new Error("Error: Instantiation failed: Use StaticRouter.getInstance() instead of new.");
        }
        StaticRouter._instance = this;
    }
    StaticRouter.getInstance = function () {
        return StaticRouter._instance;
    };
    StaticRouter._instance = new StaticRouter();
    return StaticRouter;
}());
exports.StaticRouter = StaticRouter;
//# sourceMappingURL=static-router.js.map