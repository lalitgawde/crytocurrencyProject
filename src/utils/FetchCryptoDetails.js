import axios from "axios";

export const fetchCryptoDetails = async (cryptoCurrency) => {
  // let cryptoCurrencyNew = cryptoCurrency;
  // if (cryptoCurrency === "ripple") {
  //   cryptoCurrencyNew = "xrp";
  // }
  // const url = `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}`;
  // try {
  //   const response = await axios.get(url);
  //   console.log("response", response);
  //   let obj = {
  //     name: response.data.data.name,
  //     symbol: response.data.data.symbol,
  //     marketCapUsd: response.data.data.marketCapUsd,
  //     supply: response.data.data.maxSupply,
  //     circulatingSupply: response.data.data.supply,
  //     rank: response.data.data.rank,
  //   };
  //   const description = await axios.get(
  //     `https://api.coingecko.com/api/v3/coins/${cryptoCurrency}`
  //   );
  //   console.log("obj", obj);

  //   console.log("description", description);
  //   obj["description"] = description.data.description.en;
  //   obj["allTimeHighUsd"] = description.data.market_data.ath.usd;
  //   console.log("obj", obj);
  //   return {
  //     message: "Data Fetch Successfully",
  //     data: obj,
  //   };
  // } catch (error) {
  //   return { message: "Error Fetching Data", error: error };
  // }
  try {
    let cryptoCurrencyNew = cryptoCurrency.toLowerCase();

    // CoinGecko's ID mapping for special cases
    if (cryptoCurrency.toLowerCase() === "ripple") {
      cryptoCurrencyNew = "ripple"; // CoinGecko uses "ripple" instead of "xrp"
    }

    // Fetch coin data from CoinGecko
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoCurrencyNew}`;
    const response = await axios.get(url);

    console.log("response", response.data);

    let obj = {
      name: response.data.name,
      symbol: response.data.symbol.toUpperCase(),
      marketCapUsd: response.data.market_data.market_cap.usd,
      supply: response.data.market_data.total_supply, // Total supply
      circulatingSupply: response.data.market_data.circulating_supply,
      rank: response.data.market_cap_rank, // Rank field
      description: response.data.description.en, // Description
      allTimeHighUsd: response.data.market_data.ath.usd, // All-time high price
    };

    console.log("obj", obj);

    return {
      message: "Data Fetch Successfully",
      data: obj,
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return { message: "Error Fetching Data", error };
  }
};
