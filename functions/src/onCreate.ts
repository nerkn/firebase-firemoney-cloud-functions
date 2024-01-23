import { region } from "firebase-functions/v1";
import { fireDb } from "./firebase";

export const onCreate = region("europe-west3")
  .auth.user()
  .onCreate(async (user) => {
    const userRec = {
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
      name: user.displayName?.toLowerCase(),
      balance: 1000,
    };
    if (!user.email) {
      console.info("without email", user);
      return 0;
    }
    const balanceRef = fireDb.doc("users/" + user.uid);
    const balanceSnap = await balanceRef.get();
    if (!balanceSnap.exists) {
      console.info("new user", userRec.email, userRec.balance);
      balanceRef.set(userRec);
    }
    return userRec.balance;
  });
