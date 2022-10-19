/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-09 16:52
 */

import { IEndpointData } from "../types/endpoint-data.type";

//declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

export function endpoint(endpointInfo: IEndpointData) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("META TARGET ::", target);
		console.log("META propertyKey ::", propertyKey);
		console.log("META descriptor ::", descriptor);


		//descriptor: TypedPropertyDescriptor<(... p:any[]) => Promise<any>>
		Reflect.defineMetadata(
			// this here is to reference the data later when we retrieve it.
			propertyKey,
			{
				// we put this spread operator in case you have decorated already, so
				// we dont want to lose the old data
				...Reflect.getMetadata(propertyKey, target),
				// then we append whatever else we need

				data: {
					name: propertyKey,
					endpointInfo
				},
			},
			target,
		);
		return descriptor;
	};
}
