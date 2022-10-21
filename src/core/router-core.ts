/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>

 */

import { IDinaController }     from "@dTypes/dina-controller.type";
import { IEndpointDecoration } from "@dTypes/endpoint-decoration.type";
import { IRouteInfo }          from "@dTypes/route-info.type";
import { RouteMethod }         from "@dTypes/route.types";
import { DLog }                from "dina-common";
import { UrlUtils }            from "dina-common/utils";
import { Router }              from "express";
import { singleton }           from "tsyringe";
import { IEndpointData }       from "@dTypes/endpoint-data.type";
import { ControllerRouter }    from "./controller-router";

@singleton()
export class RouterCore {
	parent: IDinaController  = undefined;
	basePath: string         = undefined;
	router: Router           = Router();
	routesInfo: IRouteInfo[] = new Array<IRouteInfo>();
	absoluteBaseUrl: string;
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
		}
		catch (e) {
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

	/**
	 * Set the servers absolute url to allow
	 * links to appear when listing paths
	 * @param {string} absUrl
	 */
	public setSetAbsoluteBaseUrl(absUrl: string): void {
		this.absoluteBaseUrl = UrlUtils.stripTrailingSlashes(absUrl);
	}


	private parseMetaData(metaData: any, router: ControllerRouter): void {
		console.log("META DATD ::::", metaData);

		let decorationData = metaData as IEndpointDecoration;

		/*
		 const magicWand: { [K: string]: Function } = {
		 Foo: newItemFoo,
		 Bar: newItemBar,
		 xxx: newItemXXX,   // this allows you to use a different value for the argument
		 yyy: newItemXXX,   // ... to use multiple names for the same function
		 // ... and to handle gracefully the calls of non-existing functions
		 };
		 */
		const endpointData = decorationData ? decorationData.endpointData : null;

		if (decorationData && ( endpointData.method || endpointData.path )) {
			const route = endpointData.path ?? decorationData.methodName;
			router.registerRoute(endpointData.method, route, (req, res) => {
				res.json(
					{
						decorated: "action"
					}
				);
			})
		}
		else {
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
			DLog.debug(`comparing path :: ${ path } :: with router path :: ${ routerPath.fullRoute }`);
			if (routerPath.fullRoute === path) {
				DLog.info("PATH FOUND!!!");
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
					url       : `http://${ host }:${ port }${ info.fullRoute }`

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
