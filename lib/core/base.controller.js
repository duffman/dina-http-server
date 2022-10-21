"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2021-06-27 11:57
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.initRoutes = function (routes) {
        return Promise.resolve(undefined);
    };
    BaseController.prototype.sendActionResult = function (resp, actionRes) {
        if (actionRes.success) {
            resp.status(200).json(actionRes.data);
        }
        else {
            resp.json({
                error: actionRes === null || actionRes === void 0 ? void 0 : actionRes.error
            });
        }
    };
    BaseController.prototype.sendError = function (resp, error) {
        resp.send(JSON.stringify({
            success: false,
            error: error
        }));
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map