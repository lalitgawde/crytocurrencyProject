import axios from "axios";

export const fetchCryptoData = async (currency, days) => {
  // try {
  //   let cryptoCurrencyNew = currency;
  //   if (currency === "ripple") {
  //     cryptoCurrencyNew = "xrp";
  //   }
  //   const assetResponse = await axios.get(
  //     `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}`
  //   );
  //   const { id, symbol, priceUsd, changePercent24Hr } = assetResponse.data.data;
  //   const historicalResponse = await axios.get(
  //     `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}/history?interval=d1`
  //   );
  //   const history = historicalResponse.data.data.slice(-7); // Last 7 days

  //   return {
  //     message: "Data Fetch Successfully",
  //     id,
  //     symbol,
  //     priceUsd,
  //     changePercent24Hr,
  //     history,
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
    console.log("days", days);
    // Handle special cases where CoinGecko uses different IDs
    if (currency.toLowerCase() === "ripple") {
      cryptoCurrencyNew = "ripple"; // CoinGecko uses "ripple" instead of "xrp"
    }

    // Fetch cryptocurrency data
    const assetResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoCurrencyNew}`
    );

    const { id, symbol, market_data } = assetResponse.data;
    const priceUsd = market_data.current_price.usd;
    const changePercent24Hr = market_data.price_change_percentage_24h;

    // Fetch historical data (last 7 days)
    const historicalResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoCurrencyNew}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );

    // Format historical data
    const history = historicalResponse.data.prices.map(
      ([timestamp, price]) => ({
        time: timestamp,
        priceUsd: price,
      })
    );

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
