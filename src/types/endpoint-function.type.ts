/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-19 05:24
 */

import { Response } from "express";
import { Request }  from "express";

export type EndpointFunction = (req?: Request, resp?: Response) => Promise<void>;
