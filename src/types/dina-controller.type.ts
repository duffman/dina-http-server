/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */


import { ControllerRouter } from "@core/controller-router";
import { Response }         from "express";
import { Request }          from "express";

export interface IDinaController {
	baseRoute?: string;
	initRoutes(routes: ControllerRouter): Promise<void>;
}
