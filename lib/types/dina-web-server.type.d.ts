/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
import { IDinaController } from "@dTypes/dina-controller.type";
export interface IDinaWebServer {
    registerController(controller: IDinaController): IDinaWebServer;
    registerControllers(controller: IDinaController[]): IDinaWebServer;
}
//# sourceMappingURL=dina-web-server.type.d.ts.map