import { setGlobalOptions } from "firebase-functions/v2/options";
import { onCreate } from "./src/onCreate";
import { txRequest } from "./src/txRequest";

setGlobalOptions({ maxInstances: 10 });
export { onCreate, txRequest };
