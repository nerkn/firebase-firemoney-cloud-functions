"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreate = void 0;
const v1_1 = require("firebase-functions/v1");
const firebase_1 = require("./firebase");
exports.onCreate = (0, v1_1.region)("europe-west3")
    .auth.user()
    .onCreate(async (user) => {
    var _a;
    const userRec = {
        uid: user.uid,
        email: user.email,
        photo: user.photoURL,
        name: (_a = user.displayName) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
        balance: 1000,
    };
    if (!user.email) {
        console.info("without email", user);
        return 0;
    }
    const balanceRef = firebase_1.fireDb.doc("users/" + user.uid);
    const balanceSnap = await balanceRef.get();
    if (!balanceSnap.exists) {
        console.info("new user", userRec.email, userRec.balance);
        balanceRef.set(userRec);
    }
    return userRec.balance;
});
//# sourceMappingURL=onCreate.js.map