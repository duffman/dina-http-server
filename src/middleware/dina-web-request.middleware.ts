/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-09-29 07:58
 */

import { Response } from "express";
import { Request }  from "express";

export function dinaWebRequestMiddleware(req: Request, response: Response, next) {
	req.paramData = new Map<string, any>();

	if (req.params) {
		for (const param in req.params) {
			if (req.params.hasOwnProperty(param))
				req.paramData.set(param, req.params[ param ]);
		}
	}

	if (req.query) {
		for (const param in req.query) {
			if (req.query.hasOwnProperty(param))
				req.paramData.set(param, req.query[ param ]);
		}
	}

	req.getParam = function <T>(name: string, def?: T): T {
		return req.paramData.get(name) as T ?? def;
	}

	req.getParamStr = function(name: string, def?: string): string {
		return req.getParam<string>(name, def);
	}

	/**
	 * Return parameter as number
	 * @param {string} name
	 * @param {number} def
	 * @returns {number}
	 */
	req.getParamNum = function(name: string, def?: number): number {
		return req.getParam<number>(name, def);
	}

	/**
	 * Put new data to the paramData map
	 * @param {string} key
	 * @param value
	 */
	req.setParamData = function(key: string, value: any): void {
		req.paramData.set(key, value)
	}

	next();
}
