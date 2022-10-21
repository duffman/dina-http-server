/**
 * Copyright (c) 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export {};

declare global {
	export namespace Express {
		export interface Request {
			paramData: Map<string, any>;
			getParam<T>(name: string, def?: T): T;
			getParamStr(name: string, def?: string): string;
			getParamNum(name: string, def?: number): number;
			setParamData(name: string, value: any): void;
			validateParams(): IValidationResult;

			zynSessionId: number;
			zynSession: any; //WebSession;
		}

		export interface Response {
			tmpStatus?: number;
			setStatusCode(value: number): Body;
		}
	}
}
