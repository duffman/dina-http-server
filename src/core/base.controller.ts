/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2021-06-27 11:57
 */

import { IActionResult }    from "dina-common";
import { ActionResult }     from "dina-common";
import { ControllerRouter } from "./controller-router";
import { IDinaController }  from "../types/dina-controller.type";
import { Response }         from "express";

export class BaseController implements IDinaController {
	public baseRoute: string;

	public initRoutes(routes: ControllerRouter): Promise<void> {
		return Promise.resolve(undefined);
	}

	public sendActionResult(resp: Response, actionRes: IActionResult) {
		if (actionRes.success) {
			resp.status(200).json(actionRes.data);
		}
		else {
			resp.json(
				{
					error: actionRes?.error
				}
			);
		}
	}

	public sendError(resp: Response, error?: any) {
		resp.send(JSON.stringify(
			{
				success: false,
				error  : error
			}
		));
	}
}

