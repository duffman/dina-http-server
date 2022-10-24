/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { RouterCore }               from "@core/router-core";
import { IDinaEventData }           from "@core/server-events";
import { IDinaLogEventData }        from "@core/server-events";
import { DinaEventType }            from "@core/server-events";
import { DinaMiddleware }           from "@dTypes/dina-middleware.type";
import { dinaWebLoggerMiddleware }  from "@middleware/dina-web-logger.middleware";
import { dinaWebRequestMiddleware } from "@middleware/dina-web-request.middleware";
import * as bodyParser              from "body-parser";
import cors                         from "cors";
import { DLog }                     from "dina-common";
import { IActionError }             from "dina-common";
import { ActionErrorType }          from "dina-common";
import { ActionError }              from "dina-common";
import { ActionResult }             from "dina-common";
import EventEmitter                 from "events";
import { Application }              from "express";
import { Express }                  from "express";
import { Router }                   from "express";
import express                      from "express";
import { Server }                   from "net";
import { CpuInfo }                  from "os";
import { singleton }                from "tsyringe";
import { IDinaController }          from "../types";
import { IDinaWebServer }           from "../types";

export interface AppServer extends Application{
/*	use(...something: any);
	set(key: string, val: any);
	listen(key: any, val: any);*/
}


@singleton()
export class DinaWebServer extends EventEmitter implements IDinaWebServer {
	protected serverApp: AppServer;
	protected server: Server;
	protected webRoutes    = Router();
	protected controllers  = new Array<IDinaController>();
	public useAccessLog?: boolean;

	constructor(
		protected routerCore?: RouterCore
	) {
		super();

		this.serverApp = this.createServer();
	}

	private createServer(): AppServer {
		if (!this.routerCore) {
			new ActionError("No RouterCore have been assigned.")
				.setError(new Error(ActionErrorType.InternalError));

		}

		let server = express();
		server.disable('x-powered-by');
		server.use(dinaWebRequestMiddleware);
		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(this.webRoutes);
		this.routerCore.setRouter(this.webRoutes);

		return server;
	}

	public onError(eventHandler: (event: IActionError) => void): IDinaWebServer {
		super.on(DinaEventType.Error, eventHandler);
		return this;
	}

	public onLog(eventHandler: (event: IDinaLogEventData) => void): IDinaWebServer {
		super.on(DinaEventType.Log, eventHandler);
		return this;
	}

	public onData(eventHandler: (event: IDinaEventData) => void): IDinaWebServer {
		super.on(DinaEventType.Data, eventHandler);
		return this;
	}

	public enableAccessLogger(): IDinaWebServer {
		this.useAccessLog = true;
		this.serverApp.use(dinaWebLoggerMiddleware);
		return this;
	}

	/**
	 * Enable Cors header
	 * @param {string} path
	 * @returns {IDinaWebServer}
	 */
	public setCors(path: string = "*"): IDinaWebServer {
		this.webRoutes.use(cors());
		this.webRoutes.options(path, cors());
		return this;
	}

	public json(): IDinaWebServer {
		this.webRoutes.use(bodyParser.json());
		return this;
	}

	public setViewEngine(name: string): IDinaWebServer {
		this.serverApp.set("view engine", name);
		return this;
	}

	/**
	 * Assign root path for static assets
	 * @param {string} rootPath
	 * @returns {IDinaWebServer}
	 */
	public setStaticRoot(rootPath: string): IDinaWebServer {
		this.serverApp.use(express.static(rootPath));
		return this;
	}

	/**
	 * Add Static Path Alias (e.g "
	 * @param {string} alias
	 * @param {string} path
	 * @returns {IDinaWebServer}
	 */
	public addStaticPathAlias(alias: string, path: string): IDinaWebServer {
		this.serverApp.use(express.static('template'));
		this.serverApp.use(alias, express.static(path));
		return this;
	}

	public registerMiddleware(middleware: DinaMiddleware): IDinaWebServer {
		this.serverApp.use(middleware);
		return this;
	}

	public registerController(controller: IDinaController): IDinaWebServer {
		try {
			this.routerCore.assignController(controller);

			//controller.initRoutes(this.routerCore);
			//this.controllers.push(controller);
		}
		catch (e) {
			console.error("Failed to register ZynapticController ::", e);
		}

		return this;
	}

	/**
	 * Register multiple controllers
	 * @param {IZynController[]} controllers
	 */
	public registerControllers(controllers: IDinaController[]): IDinaWebServer {
		for (const controller of controllers) {
			this.registerController(controller);
		}

		return this;
	}

	public utilizeMultiCoreCPU(value?: boolean): IDinaWebServer {
		this.emit(DinaEventType.Log, "utilizeMultiCoreCPU");
		const cluster = require('cluster');
		const http    = require('http');

		const cpuCores: CpuInfo = require('os').cpus();

		if (cluster.isPrimary) {
			for (let coreIndex in cpuCores) {
				const cpuCore = cpuCores[ coreIndex ];
				cluster.fork();
			}

			cluster.on('exit', (worker, code, signal) => {
				this.emit("eventType", 0);
			});
		}
		else {

			// Workers can share any TCP connection
			// In this case its a HTTP server
			http.createServer(function(req, res) {
				res.writeHead(200);
				res.end("hello world\n");
			}).listen(8000);
		}
		return this;
	}

	/**
	 * Start server on given host and port
	 * @param {string} host
	 * @param port
	 * @returns {Promise<ZynActionResult>}
	 */
	public async start(host: string, port: any = 80): Promise<ActionResult> {
		if (isNaN(port)) {
			return new ActionResult(false).setError("Invalid port");
		}

		let result: ActionResult = ActionResult.new();

		this.routerCore.setSetAbsoluteBaseUrl(`http://${ host }:${ port }`);
		this.routerCore.showInfo();

		try {
			const hostAndPort = `${ host }:${ port }`;
			this.server       = this.serverApp.listen(port, host);
			result.setSuccess().setMessage(`WebServer is listening on :: "${ host }:${ port }"`);
		}
		catch (err) {
			result.setSuccess(false)
				  .setError(`WebServer bind failed on "${ host }:${ port }"`)
		}

		return result;
	}
}
