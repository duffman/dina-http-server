/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>

 */

import { UrlUtils }            from "dina-common/utils";
import { Router }              from "express";
import { singleton }           from "tsyringe";
import { IDinaController }     from "../types/dina-controller.type";
import { IEndpointData }       from "../types/endpoint-data.type";
import { IEndpointDecoration } from "../types/endpoint-decoration.type";
import { RouteMethod }         from "../types/route.types";
import { ControllerRouter }    from "./controller-router";

type RouteHandler = (Request, Response) => Promise<void>;

@singleton()
export class RouterCore {
	parent: IDinaController  = undefined;
	basePath: string         = undefined;
	router: Router           = Router();
	routesInfo: IRouteInfo[] = new Array<IRouteInfo>();
	controllerRoutes         = new Map<IDinaController, ControllerRouter>();

	/**
	 * Assign Express Router
	 * @param {e.Router} router
	 */
	public setRouter(router: Router): void {
		this.router = router;
	}

	public assignObject(parent: IDinaController): void {
		this.parent   = parent;
		this.basePath = "";

		const keys = Reflect.getMetadataKeys(parent);

		for (let key of keys) {
			const data = Reflect.getMetadata(key, parent);
			console.log(">>> META DATA ::", data);
			const endpointInfo = data as IEndpointData;
			if (endpointInfo) {

			}
		}

		//this.parseMetaData(data);

		// then we loop through to get that keys data,
		keys.forEach((k) => {
						 const data = Reflect.getMetadata(k, parent);

						 if (data) {

						 }
					 }
		);
	}

	public assignParent(controller: IDinaController): void {
		this.parent   = controller;
		this.basePath = "";

	}

	/**
	 * Add single controller
	 * @param {IDinaController} controller
	 * @returns {boolean}
	 */
	public addController(controller: IDinaController): boolean {
		try {
			const controllerRouter = this.assignController(controller);
			controller.initRoutes(controllerRouter);
			return true;
		} catch (e) {
			return false;
		}
	}

	public assignController(controller: IDinaController): ControllerRouter {
		const controllerRouter = new ControllerRouter(this, controller)

		this.controllerRoutes.set(
			controller,
			controllerRouter
		);

		const keys = Reflect.getMetadataKeys(controller);
		// then we loop through to get that keys data,
		keys.forEach((k) => {
						 const data = Reflect.getMetadata(k, controller);

						 if (data) {
							 this.parseMetaData(data, controllerRouter);
						 }
					 }
		);

		return controllerRouter;
	}

	private parseMetaData(metaData: any, router: ControllerRouter): void {
		console.log("META DATD ::::", metaData);

		let data = metaData as IEndpointDecoration;

		/*
		const magicWand: { [K: string]: Function } = {
			Foo: newItemFoo,
			Bar: newItemBar,
			xxx: newItemXXX,   // this allows you to use a different value for the argument
			yyy: newItemXXX,   // ... to use multiple names for the same function
							   // ... and to handle gracefully the calls of non-existing functions
		};
		*/

		if (data && (data.method || data.path)) {
			const route = data.path ?? data.method;
			router.registerRoute(data.method, route, (req, res) => { })
		} else {
			throw new Error("Invalid decorator :: unable to resolve path")
		}

		console.log("parseMetaData :: parseMetaData ::", metaData?.data);
	}


	/**
	 * Check whether a given path have
	 * been registered by a controller
	 * @param {string} path
	 * @returns {boolean}
	 */
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
/*
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
		route = PathUtils.stripLeadingSlashes(route);

		if (!this.router) {
			throw new Error("No router Assigned");
		}

		if (!this.parent) {
			throw new Error("No parent Assigned");
		}

		//console.log("route ::", route);
		//console.log("this.basePath ::", this.basePath);

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

		this.addRouteInfo(method, route);

		//console.log("Final route ::", JSON.stringify(route));

		try {
			switch (method) {
				case RouteMethod.get:
					this.router.get(route, func.bind(this.parent));
					break;

				case RouteMethod.post:
					this.router.post(route, func.bind(this.parent));
					break;

				case RouteMethod.delete:
					this.router.delete(route, func.bind(this.parent));
					break;

				case RouteMethod.all:
					this.router.all(route, func.bind(this.parent));
					break;
			}
		}
		catch (e) {
			return false;
		}

		return true;
	}
	*/


	public showInfo(host?: string, port?: number): void {
		let routeInfoTable = [];
		for (let info of this.routesInfo) {

			if (host) host = host === "0.0.0.0" ? "localhost" : host;

			routeInfoTable.push(
				{
					controller: info.controllerName,
					method    : info.method,
					route     : info.fullRoute,
					url       : `http://${ host }:${ port.port }${ info.fullRoute }`

				}
			)
		}

		console.table(routeInfoTable);
	}

	/**
	 * Save route information
	 * @param {RouteMethod} method
	 * @param {string} route
	 *
	private addRouteInfo(method: RouteMethod, route: string): void {
		const name = this.parent.constructor.name;

		this.routesInfo.push(
			{
				controllerName: name,
				method        : method,
				fullRoute     : route
			});
	}
	 */
}
