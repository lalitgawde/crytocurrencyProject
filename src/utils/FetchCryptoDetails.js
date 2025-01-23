import axios from "axios";

export const fetchCryptoDetails = async (cryptoCurrency) => {
  let cryptoCurrencyNew = cryptoCurrency;
  if (cryptoCurrency === "ripple") {
    cryptoCurrencyNew = "xrp";
  }
  const url = `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}`;
  try {
    const response = await axios.get(url);
    console.log("response", response);
    let obj = {
      name: response.data.data.name,
      symbol: response.data.data.symbol,
      marketCapUsd: response.data.data.marketCapUsd,
      supply: response.data.data.maxSupply,
      circulatingSupply: response.data.data.supply,
      rank: response.data.data.rank,
    };
    const description = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoCurrency}`
    );
    console.log("obj", obj);

    console.log("description", description);
    obj["description"] = description.data.description.en;
    obj["allTimeHighUsd"] = description.data.market_data.ath.usd;
    console.log("obj", obj);
    return {
      message: "Data Fetch Successfully",
      data: obj,
    };
  } catch (error) {
    return { message: "Error Fetching Data", error: error };
  }
};
