/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-19 00:25
 */

import { IEndpointData } from "./endpoint-data.type";

export interface IEndpointDecoration {
	methodName: string;
	endpointData: IEndpointData
}
