import React, { createContext, useState } from "react";

export const CryptoContext = createContext({
  cryptoCurrency: "",
  setCryptoCurrency: () => {},
});

function CryptoContextProvider({ children }) {
  const [cryptoCurrency, setCryptoCurrency] = useState("bitcoin");
  const cryptoObj = {
    cryptoCurrency,
    setCryptoCurrency,
  };
  return (
    <CryptoContext.Provider value={cryptoObj}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextProvider;
