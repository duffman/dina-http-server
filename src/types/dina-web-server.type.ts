/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { IDinaController } from "@dTypes/dina-controller.type";

export interface IDinaWebServer {
	registerController(controller: IDinaController): boolean;
	registerControllers(controller: IDinaController[]): boolean;
}
