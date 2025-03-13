import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { CryptoContext } from "../../../store/CryptoContext";

const Footer = () => {
  const cryptoContext = useContext(CryptoContext);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchLastUpdateTime = async () => {
      if (cryptoContext.cryptoCurrency) {
        const assetResponse = await axios.get(
          `https://api.coincap.io/v2/assets/${cryptoContext.cryptoCurrency}`
        );
        const timestamp = assetResponse.data.timestamp;
        setLastUpdated(formatTimestamp(timestamp));
      }
    };
    fetchLastUpdateTime();
  }, [cryptoContext.cryptoCurrency]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString().split(",")[0]; // Converts to a readable date and time
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        marginTop: "2rem",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Last Updated: {lastUpdated ? lastUpdated : "02/03/2025"}
      </Typography>
    </Box>
  );
};

export default Footer;
