/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { IDinaEventData }          from "@core/server-events";
import { IDinaLogEventData }       from "@core/server-events";
import { DinaEventType }           from "@core/server-events";
import { IDinaController }         from "@dTypes/dina-controller.type";
import { DinaMiddleware }          from "@dTypes/dina-middleware.type";
import { dinaWebLoggerMiddleware } from "@middleware/dina-web-logger.middleware";
import * as bodyParser             from "body-parser";
import { IActionResult }           from "dina-common";
import { IActionError }            from "dina-common";
import express                     from "express";
import { CpuInfo }                 from "os";

export interface IDinaWebServer {
	onError(eventHandler: (event: IActionError) => void): IDinaWebServer;
	onLog(eventHandler: (event: IDinaLogEventData) => void): IDinaWebServer;
	onData(eventHandler: (event: IDinaEventData) => void): IDinaWebServer;
	enableAccessLogger(): IDinaWebServer;
	setCors(path: string): IDinaWebServer;
	json(): IDinaWebServer;
	setViewEngine(name: string): IDinaWebServer;
	setStaticRoot(rootPath: string): IDinaWebServer;
	addStaticPathAlias(alias: string, path: string): IDinaWebServer;
	registerMiddleware(middleware: DinaMiddleware): IDinaWebServer;
	registerController(controller: IDinaController): IDinaWebServer;
	registerControllers(controllers: IDinaController[]): IDinaWebServer;
	utilizeMultiCoreCPU(value?: boolean): IDinaWebServer;
	start(host: string, port: any): Promise<IActionResult>;
}
