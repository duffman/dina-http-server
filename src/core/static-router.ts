/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Router } from "express";

export class StaticRouter {
	private static _instance: StaticRouter = new StaticRouter();

	public routes = Router();

	constructor() {
		if (StaticRouter._instance) {
			throw new Error("Error: Instantiation failed: Use StaticRouter.getInstance() instead of new.");
		}
		StaticRouter._instance = this;
	}

	public static getInstance(): StaticRouter {
		return StaticRouter._instance;
	}
}
