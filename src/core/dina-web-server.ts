/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RouterCore }      from "@core/router-core";
import { IDinaController } from "@dTypes/dina-controller.type";
import { IDinaWebServer }  from "@dTypes/dina-web-server.type";
import * as bodyParser     from "body-parser";
import cors                from "cors";
import { Router }          from "express";
import express             from "express";
import { singleton }       from "tsyringe";

@singleton()
export class DinaWebServer implements IDinaWebServer {
	app: express.Application;
	server: any;
	webRoutes   = Router();
	controllers = new Array<IDinaController>();

	constructor(
		private routerCore: RouterCore
	) {
		this.app = express();
		this.app.use(dinaWebLoggerMiddleware);
		this.app.use(dinaWebRequestMiddleware);
		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		this.webRoutes.use(cors());
		this.webRoutes.options("*", cors());
		this.app.use(this.webRoutes);
	}

	public registerController(controller: IDinaController): boolean {
		this.controllers.push(controller);
		return true;
	}

	public registerControllers(controller: IDinaController[]): boolean {
		this.controllers.concat(controller);
		return true;
	}
}
