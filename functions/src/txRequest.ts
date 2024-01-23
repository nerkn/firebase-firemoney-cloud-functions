import { onCall } from "firebase-functions/v2/https";
import { User } from "./types";
import { fireDb } from "./firebase";
import { DocumentReference } from "firebase-admin/firestore";

export const txRequest = onCall({ region: "europe-west3" }, async (request) => {
  // to: user, amounth: number) {
  let to: User = request.data.to;
  let amounth = request.data.amounth;
  if (amounth < 1) return { error: 1, msg: "wrong amounth" };
  let userId = request?.auth?.uid;
  if (!userId) return { error: 1, msg: "Who are you?" };

  if (!to.uid || to.uid == userId)
    return { error: 1, msg: "wrong on recipient" };

  const balanceRef = fireDb.doc("users/" + userId) as DocumentReference<User>;
  const balanceSnap = await balanceRef.get();
  if (!balanceSnap.exists) return { error: 1, msg: "I cant find you" };
  let myBalance = balanceSnap.data()?.balance || 0;
  if (myBalance < amounth) return { error: 1, msg: " No sufficient funds" };

  let recipientRef = fireDb.doc("users/" + to.uid) as DocumentReference<User>;
  let recipientDoc = await recipientRef.get();
  if (!recipientDoc.exists) return { error: 1, msg: "Recipient cant find" };
  //TODO: unit of work?
  let txid =
    new Date().getTime().toString(31) + (Math.random() << 10).toString(31);
  await Promise.allSettled([
    balanceRef.update({ balance: myBalance - amounth }),
    recipientRef.update({ balance: recipientDoc.data()?.balance + amounth }),
    fireDb.collection("txRequest").doc(txid).create({
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
