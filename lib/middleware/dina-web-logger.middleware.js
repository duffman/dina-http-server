"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dinaWebLoggerMiddleware = void 0;
var dina_common_1 = require("dina-common");
function dinaWebLoggerMiddleware(req, resp, next) {
    try {
        resp.removeHeader("X-Powered-By");
        dina_common_1.DLog.debug("".concat(req.method, " ").concat(req.path));
    }
    catch (e) {
        console.error(e);
    }
    finally {
        next();
    }
}
exports.dinaWebLoggerMiddleware = dinaWebLoggerMiddleware;
//# sourceMappingURL=dina-web-logger.middleware.js.map