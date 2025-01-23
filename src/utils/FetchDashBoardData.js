import axios from "axios";

export const fetchCryptoData = async (currency) => {
  try {
    let cryptoCurrencyNew = currency;
    if (currency === "ripple") {
      cryptoCurrencyNew = "xrp";
    }
    const assetResponse = await axios.get(
      `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}`
    );
    const { id, symbol, priceUsd, changePercent24Hr } = assetResponse.data.data;
    const historicalResponse = await axios.get(
      `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}/history?interval=d1`
    );
    const history = historicalResponse.data.data.slice(-7); // Last 7 days

    return {
      message: "Data Fetch Successfully",
      id,
      symbol,
      priceUsd,
      changePercent24Hr,
      history,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      message: "Data Fetch Failed",
      error,
    };
  }
};
