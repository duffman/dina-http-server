/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
import { ControllerRouter } from "@core/controller-router";
import { Response } from "express";
import { Request } from "express";
export declare type EndpointFunction = (req?: Request, resp?: Response) => Promise<void>;
export interface IDinaController {
    baseRoute?: string;
    initRoutes(routes: ControllerRouter): Promise<void>;
}
//# sourceMappingURL=dina-controller.type.d.ts.map