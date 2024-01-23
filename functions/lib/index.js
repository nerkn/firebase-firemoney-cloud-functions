"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txRequest = exports.onCreate = void 0;
const options_1 = require("firebase-functions/v2/options");
const onCreate_1 = require("./src/onCreate");
Object.defineProperty(exports, "onCreate", { enumerable: true, get: function () { return onCreate_1.onCreate; } });
const txRequest_1 = require("./src/txRequest");
Object.defineProperty(exports, "txRequest", { enumerable: true, get: function () { return txRequest_1.txRequest; } });
(0, options_1.setGlobalOptions)({ maxInstances: 10 });
//# sourceMappingURL=index.js.map