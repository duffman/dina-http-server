/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2021-06-27 11:57
 */
import { ControllerRouter } from "@core/controller-router";
import { IDinaController } from "@dTypes/dina-controller.type";
import { IAction } from "dina-common";
import { Response } from "express";
export declare class BaseController implements IDinaController {
    baseRoute: string;
    initRoutes(routes: ControllerRouter): Promise<void>;
    sendActionResult(resp: Response, actionRes: IAction): void;
    sendError(resp: Response, error?: any): void;
}
//# sourceMappingURL=base.controller.d.ts.map