"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txRequest = void 0;
const https_1 = require("firebase-functions/v2/https");
const firebase_1 = require("./firebase");
exports.txRequest = (0, https_1.onCall)({ region: "europe-west3" }, async (request) => {
    var _a, _b, _c;
    // to: user, amounth: number) {
    let to = request.data.to;
    let amounth = request.data.amounth;
    if (amounth < 1)
        return { error: 1, msg: "wrong amounth" };
    let userId = (_a = request === null || request === void 0 ? void 0 : request.auth) === null || _a === void 0 ? void 0 : _a.uid;
    if (!userId)
        return { error: 1, msg: "Who are you?" };
    if (!to.uid || to.uid == userId)
        return { error: 1, msg: "wrong on recipient" };
    const balanceRef = firebase_1.fireDb.doc("users/" + userId);
    const balanceSnap = await balanceRef.get();
    if (!balanceSnap.exists)
        return { error: 1, msg: "I cant find you" };
    let myBalance = ((_b = balanceSnap.data()) === null || _b === void 0 ? void 0 : _b.balance) || 0;
    if (myBalance < amounth)
        return { error: 1, msg: " No sufficient funds" };
    let recipientRef = firebase_1.fireDb.doc("users/" + to.uid);
    let recipientDoc = await recipientRef.get();
    if (!recipientDoc.exists)
        return { error: 1, msg: "Recipient cant find" };
    //TODO: unit of work?
    let txid = new Date().getTime().toString(31) + (Math.random() << 10).toString(31);
    await Promise.allSettled([
        balanceRef.update({ balance: myBalance - amounth }),
        recipientRef.update({ balance: ((_c = recipientDoc.data()) === null || _c === void 0 ? void 0 : _c.balance) + amounth }),
        firebase_1.fireDb.collection("txRequest").doc(txid).create({
            sender: userId,
            receiver: to.uid,
            amounth,
            status: "start",
            txTime: new Date().getTime(),
        }),
    ]);
    return {
        error: 0,
        msg: "tx order has been given",
        data: myBalance - amounth,
    };
});
//# sourceMappingURL=txRequest.js.map