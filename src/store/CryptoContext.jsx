import React, { createContext, useState } from "react";

export const CryptoContext = createContext({
  currency: "",
  cryptoCurrency: "",
  setCryptoCurrency: () => {},
  setCurrency: () => {},
});

function CryptoContextProvider({ children }) {
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [currency, setCurrency] = useState("USD");
  const cryptoObj = {
    currency,
    cryptoCurrency,
    setCryptoCurrency,
    setCurrency,
  };
  return (
    <CryptoContext.Provider value={cryptoObj}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextProvider;
