import axios from "axios";

export const FetchAllCryptoCurrency = async (cryptoCurrency) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cryptoCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
  try {
    const response = await axios.get(url);
    console.log("response", response);
    return {
      message: "All Currency Data Fetch Successfully",
      data: response.data,
    };
  } catch (error) {
    return { message: "Error Fetching Data", error: error };
  }
};
