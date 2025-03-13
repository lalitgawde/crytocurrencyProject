import React, { createContext, useState, useEffect, useContext } from "react";
import { CryptoContext } from "./CryptoContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});

function UserContextProvider({ children }) {
  const { setWatchlist } = useContext(CryptoContext);
  const [user, setUser] = useState("");
  const cryptoObj = {
    user,
    setUser,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <UserContext.Provider value={cryptoObj}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
