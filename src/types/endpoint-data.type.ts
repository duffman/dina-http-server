/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-09 16:54
 */

import { HttpMethod } from "./http-method.type";

export interface IEndpointData {
	method: HttpMethod,
	path?: string,
	requireParams?: boolean
}
