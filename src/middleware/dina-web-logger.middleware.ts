/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { DLog } from "dina-common";
import { Response }   from "express";
import { Request }    from "express";

export function dinaWebLoggerMiddleware(req: Request, resp: Response, next) {
	try {
		resp.removeHeader("X-Powered-By");
		DLog.debug(`${ req.method } ${ req.path }`);

	} catch (e) {
		console.error(e);
	}
	finally {
		next();
	}
}
