import React, { useEffect, useContext, useState } from "react";
import { CryptoContext } from "../../store/CryptoContext";
import { fetchCryptoData } from "../../utils/FetchDashBoardData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import CircularLoader from "../UI/CircularLoader";
import styles from "./DashBoard.module.css";
import { chartDays } from "../../config/data";
import SelectButton from "../UI/SelectButton";
import { UserContext } from "../../store/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const Dashboard = () => {
  // const inWatchlist = false;
  const cryptoContext = useContext(CryptoContext);
  const { user } = useContext(UserContext);
  const [days, setDays] = useState(7);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [id, setID] = useState("");
  const [percentageChange, setPercentageChange] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const inWatchlist = cryptoContext.watchlist.includes(id);

  useEffect(() => {
    if (cryptoContext.cryptoCurrency) {
      setLoading(true);
      fetchCryptoData(cryptoContext.cryptoCurrency, days).then((res) => {
        console.log("res", res);
        if (res.message === "Data Fetch Successfully") {
          setCurrentPrice(parseFloat(res.priceUsd).toFixed(2));
          setPercentageChange(parseFloat(res.changePercent24Hr).toFixed(2));
          setID(res.id);
          setSymbol(res.symbol);
          const labels = res.history.map((entry) => {
            return new Date(entry.time).toISOString().split("T")[0];
          });
          const prices = res.history.map((entry) =>
            parseFloat(entry.priceUsd).toFixed(2)
          );
          setChartData({
            labels,
            datasets: [
              {
                label: "Price (USD)",
                data: prices,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderWidth: 2,
              },
            ],
          });
        } else {
        }
        setLoading(false);
      });
    }
  }, [cryptoContext.cryptoCurrency, days]);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: cryptoContext.watchlist
            ? [...cryptoContext.watchlist, id]
            : [id],
        },
        { merge: true }
      );

      cryptoContext.setAlert({
        open: true,
        message: `${cryptoContext.cryptoCurrency} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      cryptoContext.setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: cryptoContext.watchlist.filter((wish) => wish !== id) },
        { merge: true }
      );

      cryptoContext.setAlert({
        open: true,
        message: `${cryptoContext.cryptoCurrency} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      cryptoContext.setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return cryptoContext.cryptoCurrency !== "" ? (
    <div>
      <h2 className={styles.title}>
        Dashboard for{" "}
        {cryptoContext.cryptoCurrency.charAt(0).toUpperCase() +
          cryptoContext.cryptoCurrency.slice(1)}
      </h2>
      {user && (
        <Button
          variant="outlined"
          className={styles.watchListButton}
          style={
            {
              // width: "100%",
              // backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
            }
          }
          onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      )}
      <Box sx={{ p: 4 }}>
        {loading ? (
          <CircularLoader />
        ) : (
          <>
            {/* Current Price and Change */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5">
                  {id !== "xrp"
                    ? id.charAt(0).toUpperCase() + id.slice(1)
                    : "Ripple"}{" "}
                  ({symbol})
                </Typography>
                <Typography variant="h4">${currentPrice}</Typography>
                <Typography
                  variant="subtitle1"
                  color={percentageChange >= 0 ? "green" : "red"}
                >
                  {percentageChange >= 0 ? "+" : ""}
                  {percentageChange}% (24h)
                </Typography>
              </CardContent>
            </Card>

            {/* Historical Data Chart */}
            {chartData && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {`${
                      chartDays.filter((day) => day.value === days)[0].label
                    }`}{" "}
                    Price Trend
                  </Typography>
                  <Line
                    data={chartData}
                    width={400} // Set the width in pixels
                    height={100} // Set the height in pixels
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true, position: "top" },
                        tooltip: { enabled: true },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: "Date" },
                        },
                        y: {
                          title: { display: true, text: "Price (USD)" },
                          beginAtZero: false,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Box>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              setDays(day.value);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.Heading}>
      <h2>Please Select the CryptoCurrency</h2>
    </div>
  );
};

export default Dashboard;
