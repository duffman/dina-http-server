/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
/// <reference types="node" />
import { RouterCore } from "@core/router-core";
import { IDinaEventData } from "@core/server-events";
import { IDinaLogEventData } from "@core/server-events";
import { DinaMiddleware } from "@dTypes/dina-middleware.type";
import { IActionError } from "dina-common";
import { ActionResult } from "dina-common";
import EventEmitter from "events";
import express from "express";
import { Server } from "net";
import { IDinaController } from "../types";
import { IDinaWebServer } from "../types";
export declare class DinaWebServer extends EventEmitter implements IDinaWebServer {
    protected routerCore?: RouterCore;
    protected serverApp: express.Application;
    protected server: Server;
    protected webRoutes: import("express-serve-static-core").Router;
    protected controllers: IDinaController[];
    useAccessLog?: boolean;
    constructor(routerCore?: RouterCore);
    private createServer;
    onError(eventHandler: (event: IActionError) => void): IDinaWebServer;
    onLog(eventHandler: (event: IDinaLogEventData) => void): IDinaWebServer;
    onData(eventHandler: (event: IDinaEventData) => void): IDinaWebServer;
    enableAccessLogger(): IDinaWebServer;
    /**
     * Enable Cors header
     * @param {string} path
     * @returns {IDinaWebServer}
     */
    setCors(path?: string): IDinaWebServer;
    json(): IDinaWebServer;
    setViewEngine(name: string): IDinaWebServer;
    /**
     * Assign root path for static assets
     * @param {string} rootPath
     * @returns {IDinaWebServer}
     */
    setStaticRoot(rootPath: string): IDinaWebServer;
    /**
     * Add Static Path Alias (e.g "
     * @param {string} alias
     * @param {string} path
     * @returns {IDinaWebServer}
     */
    addStaticPathAlias(alias: string, path: string): IDinaWebServer;
    registerMiddleware(middleware: DinaMiddleware): IDinaWebServer;
    registerController(controller: IDinaController): IDinaWebServer;
    /**
     * Register multiple controllers
     * @param {IZynController[]} controllers
     */
    registerControllers(controllers: IDinaController[]): IDinaWebServer;
    utilizeMultiCoreCPU(value?: boolean): IDinaWebServer;
    /**
     * Start server on given host and port
     * @param {string} host
     * @param port
     * @returns {Promise<ZynActionResult>}
     */
    start(host: string, port?: any): Promise<ActionResult>;
}
//# sourceMappingURL=dina-web-server.d.ts.map