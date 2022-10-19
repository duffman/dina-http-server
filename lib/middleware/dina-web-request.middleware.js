"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-29 07:58
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dinaWebRequestMiddleware = void 0;
function dinaWebRequestMiddleware(req, response, next) {
    req.paramData = new Map();
    if (req.params) {
        for (var param in req.params) {
            if (req.params.hasOwnProperty(param))
                req.paramData.set(param, req.params[param]);
        }
    }
    if (req.query) {
        for (var param in req.query) {
            if (req.query.hasOwnProperty(param))
                req.paramData.set(param, req.query[param]);
        }
    }
    req.getParam = function (name, def) {
        var _a;
        return (_a = req.paramData.get(name)) !== null && _a !== void 0 ? _a : def;
    };
    req.getParamStr = function (name, def) {
        return req.getParam(name, def);
    };
    /**
     * Return parameter as number
     * @param {string} name
     * @param {number} def
     * @returns {number}
     */
    req.getParamNum = function (name, def) {
        return req.getParam(name, def);
    };
    /**
     * Put new data to the paramData map
     * @param {string} key
     * @param value
     */
    req.setParamData = function (key, value) {
        req.paramData.set(key, value);
    };
    next();
}
exports.dinaWebRequestMiddleware = dinaWebRequestMiddleware;
//# sourceMappingURL=dina-web-request.middleware.js.map