/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { RouterCore } from "@core/router-core";
import { IDinaController } from "@dTypes/dina-controller.type";
import { IDinaWebServer } from "@dTypes/dina-web-server.type";
import express from "express";
export declare class DinaWebServer implements IDinaWebServer {
    private routerCore;
    app: express.Application;
    server: any;
    webRoutes: import("express-serve-static-core").Router;
    controllers: IDinaController[];
    constructor(routerCore: RouterCore);
    registerController(controller: IDinaController): boolean;
    registerControllers(controller: IDinaController[]): boolean;
}
//# sourceMappingURL=dina-web-server.d.ts.map