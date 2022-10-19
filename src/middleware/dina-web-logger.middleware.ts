/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { Response } from "express";
import { Request }  from "express";

export function dinaWebLoggerMiddleware(req: Request, resp: Response, next) {
	resp.removeHeader("X-Powered-By");

	// console.log(`${ req.method } ${ req.path }`);
	next();
}
