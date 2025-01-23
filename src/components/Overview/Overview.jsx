import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../store/CryptoContext";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "./Overview.module.css";
import CircularLoader from "../UI/CircularLoader";
import { fetchCryptoDetails } from "../../utils/FetchCryptoDetails";

const Overview = () => {
  const cryptoContext = useContext(CryptoContext);
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      if (cryptoContext.cryptoCurrency) {
        fetchCryptoDetails(cryptoContext.cryptoCurrency).then((res) => {
          console.log("res", res);
          if (res.message === "Data Fetch Successfully") {
            setCryptoDetails(res.data);
          } else {
          }
          setLoading(false);
        });
      }
    };

    if (cryptoContext.cryptoCurrency) {
      fetchDetails();
    }
  }, [cryptoContext.cryptoCurrency]);

  return cryptoContext.cryptoCurrency !== "" ? (
    <div className={styles.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularLoader />
        </Box>
      ) : (
        cryptoDetails && (
          <Card className={styles.card} elevation={3}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Overview of {cryptoDetails.name} ({cryptoDetails.symbol})
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6" color="textSecondary">
                  Purpose and Usage:
                </Typography>
                <Typography variant="body1">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        cryptoDetails.description ||
                        "No description available.",
                    }}
                  />
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Card className={styles.detailCard}>
                  <CardContent>
                    <Typography variant="h6">Market Cap</Typography>
                    <Typography variant="body1">
                      ${parseFloat(cryptoDetails.marketCapUsd).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>

                <Card className={styles.detailCard}>
                  <CardContent>
                    <Typography variant="h6">Total Supply</Typography>
                    <Typography variant="body1">
                      {parseFloat(cryptoDetails.supply).toLocaleString()}{" "}
                      {cryptoDetails.symbol}
                    </Typography>
                  </CardContent>
                </Card>

                <Card className={styles.detailCard}>
                  <CardContent>
                    <Typography variant="h6">Circulating Supply</Typography>
                    <Typography variant="body1">
                      {parseFloat(
                        cryptoDetails.circulatingSupply
                      ).toLocaleString()}{" "}
                      {cryptoDetails.symbol}
                    </Typography>
                  </CardContent>
                </Card>

                <Card className={styles.detailCard}>
                  <CardContent>
                    <Typography variant="h6">All-time High Price</Typography>
                    <Typography variant="body1">
                      ${parseFloat(cryptoDetails.allTimeHighUsd).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>

                <Card className={styles.detailCard}>
                  <CardContent>
                    <Typography variant="h6">Rank</Typography>
                    <Typography variant="body1">
                      #{cryptoDetails.rank}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        )
      )}
    </div>
  ) : (
    <div className={styles.Heading}>
      <h2>Please Select the CryptoCurrency</h2>
    </div>
  );
};

export default Overview;
