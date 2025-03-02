import axios from "axios";

export const fetchHistoricalData = async (currency) => {
  // try {
  //   let cryptoCurrencyNew = currency;
  //   if (currency === "ripple") {
  //     cryptoCurrencyNew = "xrp";
  //   }
  //   const url = `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}/history?interval=d1`;
  //   const response = await axios.get(url);
  //   return {
  //     message: "Data Fetch Successfully",
  //     data: response.data,
  //   };
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return {
  //     message: "Data Fetch Failed",
  //     error,
  //   };
  // }
  try {
    let cryptoCurrencyNew = currency.toLowerCase();

    // CoinGecko ID mapping for special cases
    if (currency.toLowerCase() === "ripple") {
      cryptoCurrencyNew = "ripple"; // CoinGecko uses "ripple" instead of "xrp"
    }

    // Fetch historical price data
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoCurrencyNew}/market_chart?vs_currency=usd&days=365&interval=daily`;
    const response = await axios.get(url);
    console.log("response", response);
    // Format the response to match the expected structure
    const history = response.data.prices.map(([timestamp, price]) => ({
      time: timestamp,
      priceUsd: price,
    }));
    console.log("history", history);
    return {
      message: "Data Fetch Successfully",
      data: history,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      message: "Data Fetch Failed",
      error,
    };
  }
};
