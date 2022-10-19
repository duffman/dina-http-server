"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DinaWebServer = void 0;
var router_core_1 = require("@core/router-core");
var bodyParser = __importStar(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = require("express");
var express_2 = __importDefault(require("express"));
var tsyringe_1 = require("tsyringe");
var DinaWebServer = /** @class */ (function () {
    function DinaWebServer(routerCore) {
        this.routerCore = routerCore;
        this.webRoutes = (0, express_1.Router)();
        this.controllers = new Array();
        this.app = (0, express_2.default)();
        this.app.use(dinaWebLoggerMiddleware);
        this.app.use(dinaWebRequestMiddleware);
        this.webRoutes.use(bodyParser.json());
        this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
        this.webRoutes.use((0, cors_1.default)());
        this.webRoutes.options("*", (0, cors_1.default)());
        this.app.use(this.webRoutes);
    }
    DinaWebServer.prototype.registerController = function (controller) {
        this.controllers.push(controller);
        return true;
    };
    DinaWebServer.prototype.registerControllers = function (controller) {
        this.controllers.concat(controller);
        return true;
    };
    DinaWebServer = __decorate([
        (0, tsyringe_1.singleton)(),
        __metadata("design:paramtypes", [router_core_1.RouterCore])
    ], DinaWebServer);
    return DinaWebServer;
}());
exports.DinaWebServer = DinaWebServer;
//# sourceMappingURL=dina-web-server.js.map