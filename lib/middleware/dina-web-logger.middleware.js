"use strict";
/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dinaWebLoggerMiddleware = void 0;
function dinaWebLoggerMiddleware(req, resp, next) {
    resp.removeHeader("X-Powered-By");
    // console.log(`${ req.method } ${ req.path }`);
    next();
}
exports.dinaWebLoggerMiddleware = dinaWebLoggerMiddleware;
//# sourceMappingURL=dina-web-logger.middleware.js.map