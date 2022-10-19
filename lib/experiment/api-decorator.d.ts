export declare function ApiController<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
export declare function DinaController(basePath: string): (constructor: Function) => void;
export declare function ActionMethod(params?: any): (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function TypeRestrictedMethodDecorator(target: Object, // The prototype of the class
propertyKey: string, // The name of the method
descriptor: TypedPropertyDescriptor<(...p: any[]) => Promise<any>>): void;
export declare function CmApiGet(path: string, omitBasePath?: boolean): (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
//# sourceMappingURL=api-decorator.d.ts.map