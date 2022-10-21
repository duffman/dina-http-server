/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2021-10-14 13:39
 */

import { IRouteInfo }      from "@dTypes/route-info.type";
import { UrlUtils }        from "dina-common/utils";
import { RouterCore }      from "./router-core";
import { IDinaController } from "@dTypes/dina-controller.type";
import { RouteMethod }     from "@dTypes/route.types";
import { Router }          from "express";

export class ControllerRouter {
	basePath: string = "";
	router: Router;
	routesInfo       = new Array<IRouteInfo>();

	constructor(private routerCore: RouterCore, private controller: IDinaController) {
		this.router = routerCore.router;
	}

	public havePath(path: string): boolean {
		for (let routerPath of this.routesInfo) {
			console.log(`comparing path :: ${ path } :: with router path :: ${ routerPath.fullRoute }`);
			if (routerPath.fullRoute === path) {
				console.log("PATH FOUND!!!");
				return true;
			}
		}

		return false;
	}

	public setBasePath(path: string): void {
		path          = UrlUtils.stripTrailingAndLeadingSlashes(path);
		this.basePath = `/${ path }/`;
	}

	public get(route: string, func: Function, noBasePath?: boolean): boolean {
		return this.registerRoute(RouteMethod.get, route, func, noBasePath);
	}

	public post(route: string, func: Function, noBasePath?: boolean): boolean {
		return this.registerRoute(RouteMethod.post, route, func, noBasePath);
	}

	public delete(route: string, func: Function, noBasePath?: boolean): boolean {
		return this.registerRoute(RouteMethod.delete, route, func, noBasePath);
	}

	public all(route: string, func: Function, noBasePath?: boolean): boolean {
		return this.registerRoute(RouteMethod.all, route, func, noBasePath);
	}

	public registerRoute(
		method: RouteMethod,
		route: string,
		func: Function,
		noBasePath?: boolean
	): boolean {
		route = UrlUtils.stripLeadingSlashes(route);

		if (!this.routerCore.router) {
			throw new Error("No router Assigned");
		}

		if (!this.controller) {
			throw new Error("No parent Assigned >>");
		}

		if (route === "/") {
			route = "";
		}

		//
		// Ignore base path for all
		//
		if (this.basePath && !noBasePath) {
			route = this.basePath + route;
		}

		if (!route.startsWith("/")) route = "/" + route;

		this.routesInfo.push(
			{
				controllerName: this.controller?.constructor.name ?? "<NO_NAME>",
				method        : method,
				fullRoute     : route
			});

		try {
			switch (method) {
				case RouteMethod.get:
					this.router.get(route, func.bind(this.controller));
					break;

				case RouteMethod.post:
					this.router.post(route, func.bind(this.controller));
					break;

				case RouteMethod.delete:
					this.router.delete(route, func.bind(this.controller));
					break;

				case RouteMethod.all:
					this.router.all(route, func.bind(this.controller));
					break;
			}
		}
		catch (e) {
			return false;
		}

		return true;
	}
}
