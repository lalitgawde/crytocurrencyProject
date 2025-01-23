import axios from "axios";

export const fetchHistoricalData = async (currency) => {
  try {
    let cryptoCurrencyNew = currency;
    if (currency === "ripple") {
      cryptoCurrencyNew = "xrp";
    }
    const url = `https://api.coincap.io/v2/assets/${cryptoCurrencyNew}/history?interval=d1`;
    const response = await axios.get(url);
    return {
      message: "Data Fetch Successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      message: "Data Fetch Failed",
      error,
    };
  }
};
