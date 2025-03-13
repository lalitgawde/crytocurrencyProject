import React, { createContext, useState } from "react";

export const CryptoContext = createContext({
  currency: "",
  cryptoCurrency: "",
  setCryptoCurrency: () => {},
  setCurrency: () => {},
  alert: {},
  setAlert: () => {},
  watchlist: [],
  setWatchlist: () => {},
  coins: [],
  setCoins: () => {},
});

function CryptoContextProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [watchlist, setWatchlist] = useState([]);

  const cryptoObj = {
    currency,
    cryptoCurrency,
    setCryptoCurrency,
    setCurrency,
    alert,
    setAlert,
    watchlist,
    setWatchlist,
    coins,
    setCoins,
  };

  return (
    <CryptoContext.Provider value={cryptoObj}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextProvider;
