import { createPatchFunction } from "src/core/vdom/patch";
import modules from "./modules";
import * as nodeOps from './node-ops'

export const patch = createPatchFunction({ modules, nodeOps })