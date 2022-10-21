"use strict";
/**
 * Copyright (c) 2022 Coldmind AB - All Rights Reserved
 * This software is subject to the LGPL 2.1 License, please find
 * the full license attached in LICENCE.md
 *
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DinaWebServer = void 0;
var router_core_1 = require("@core/router-core");
var server_events_1 = require("@core/server-events");
var dina_web_logger_middleware_1 = require("@middleware/dina-web-logger.middleware");
var dina_web_request_middleware_1 = require("@middleware/dina-web-request.middleware");
var bodyParser = __importStar(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dina_common_1 = require("dina-common");
var dina_common_2 = require("dina-common");
var dina_common_3 = require("dina-common");
var events_1 = __importDefault(require("events"));
var express_1 = require("express");
var express_2 = __importDefault(require("express"));
var tsyringe_1 = require("tsyringe");
var DinaWebServer = /** @class */ (function (_super) {
    __extends(DinaWebServer, _super);
    function DinaWebServer(routerCore) {
        var _this = _super.call(this) || this;
        _this.routerCore = routerCore;
        _this.webRoutes = (0, express_1.Router)();
        _this.controllers = new Array();
        _this.serverApp = _this.createServer();
        return _this;
    }
    DinaWebServer.prototype.createServer = function () {
        if (!this.routerCore) {
            new dina_common_2.ActionError("No RouterCore have been assigned.")
                .setError(new Error(dina_common_1.ActionErrorType.InternalError));
        }
        var server = (0, express_2.default)();
        server.disable('x-powered-by');
        server.use(dina_web_request_middleware_1.dinaWebRequestMiddleware);
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(this.webRoutes);
        this.routerCore.setRouter(this.webRoutes);
        return server;
    };
    DinaWebServer.prototype.onError = function (eventHandler) {
        _super.prototype.on.call(this, server_events_1.DinaEventType.Error, eventHandler);
        return this;
    };
    DinaWebServer.prototype.onLog = function (eventHandler) {
        _super.prototype.on.call(this, server_events_1.DinaEventType.Log, eventHandler);
        return this;
    };
    DinaWebServer.prototype.onData = function (eventHandler) {
        _super.prototype.on.call(this, server_events_1.DinaEventType.Data, eventHandler);
        return this;
    };
    DinaWebServer.prototype.enableAccessLogger = function () {
        this.useAccessLog = true;
        this.serverApp.use(dina_web_logger_middleware_1.dinaWebLoggerMiddleware);
        return this;
    };
    /**
     * Enable Cors header
     * @param {string} path
     * @returns {IDinaWebServer}
     */
    DinaWebServer.prototype.setCors = function (path) {
        if (path === void 0) { path = "*"; }
        this.webRoutes.use((0, cors_1.default)());
        this.webRoutes.options(path, (0, cors_1.default)());
        return this;
    };
    DinaWebServer.prototype.json = function () {
        this.webRoutes.use(bodyParser.json());
        return this;
    };
    DinaWebServer.prototype.setViewEngine = function (name) {
        this.serverApp.set("view engine", name);
        return this;
    };
    /**
     * Assign root path for static assets
     * @param {string} rootPath
     * @returns {IDinaWebServer}
     */
    DinaWebServer.prototype.setStaticRoot = function (rootPath) {
        this.serverApp.use(express_2.default.static(rootPath));
        return this;
    };
    /**
     * Add Static Path Alias (e.g "
     * @param {string} alias
     * @param {string} path
     * @returns {IDinaWebServer}
     */
    DinaWebServer.prototype.addStaticPathAlias = function (alias, path) {
        this.serverApp.use(express_2.default.static('template'));
        this.serverApp.use(alias, express_2.default.static(path));
        return this;
    };
    DinaWebServer.prototype.registerMiddleware = function (middleware) {
        this.serverApp.use(middleware);
        return this;
    };
    DinaWebServer.prototype.registerController = function (controller) {
        try {
            this.routerCore.assignController(controller);
            //controller.initRoutes(this.routerCore);
            //this.controllers.push(controller);
        }
        catch (e) {
            console.error("Failed to register ZynapticController ::", e);
        }
        return this;
    };
    /**
     * Register multiple controllers
     * @param {IZynController[]} controllers
     */
    DinaWebServer.prototype.registerControllers = function (controllers) {
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var controller = controllers_1[_i];
            this.registerController(controller);
        }
        return this;
    };
    DinaWebServer.prototype.utilizeMultiCoreCPU = function (value) {
        var _this = this;
        this.emit(server_events_1.DinaEventType.Log, "utilizeMultiCoreCPU");
        var cluster = require('cluster');
        var http = require('http');
        var cpuCores = require('os').cpus();
        if (cluster.isPrimary) {
            for (var coreIndex in cpuCores) {
                var cpuCore = cpuCores[coreIndex];
                cluster.fork();
            }
            cluster.on('exit', function (worker, code, signal) {
                _this.emit("eventType", 0);
            });
        }
        else {
            // Workers can share any TCP connection
            // In this case its a HTTP server
            http.createServer(function (req, res) {
                res.writeHead(200);
                res.end("hello world\n");
            }).listen(8000);
        }
        return this;
    };
    /**
     * Start server on given host and port
     * @param {string} host
     * @param port
     * @returns {Promise<ZynActionResult>}
     */
    DinaWebServer.prototype.start = function (host, port) {
        if (port === void 0) { port = 80; }
        return __awaiter(this, void 0, void 0, function () {
            var result, hostAndPort;
            return __generator(this, function (_a) {
                if (isNaN(port)) {
                    return [2 /*return*/, new dina_common_3.ActionResult(false).setError("Invalid port")];
                }
                result = dina_common_3.ActionResult.new();
                this.routerCore.setSetAbsoluteBaseUrl("http://".concat(host, ":").concat(port));
                this.routerCore.showInfo();
                try {
                    hostAndPort = "".concat(host, ":").concat(port);
                    this.server = this.serverApp.listen(port, host);
                    result.setSuccess().setMessage("ZynServer is listening on :: \"".concat(host, ":").concat(port, "\""));
                }
                catch (err) {
                    result.setSuccess(false)
                        .setError("ZynServer bind failed on \"".concat(host, ":").concat(port, "\""), err);
                }
                return [2 /*return*/, result];
            });
        });
    };
    DinaWebServer = __decorate([
        (0, tsyringe_1.singleton)(),
        __metadata("design:paramtypes", [router_core_1.RouterCore])
    ], DinaWebServer);
    return DinaWebServer;
}(events_1.default));
exports.DinaWebServer = DinaWebServer;
//# sourceMappingURL=dina-web-server.js.map