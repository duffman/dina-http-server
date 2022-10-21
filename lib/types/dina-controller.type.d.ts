/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 */
import { ControllerRouter } from "@core/controller-router";
export interface IDinaController {
    baseRoute?: string;
    initRoutes(routes: ControllerRouter): Promise<void>;
}
//# sourceMappingURL=dina-controller.type.d.ts.map