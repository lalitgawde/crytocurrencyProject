import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import styles from "./Header.module.css";
import { CryptoContext } from "../../../store/CryptoContext";

const Header = () => {
  const cryptoContext = useContext(CryptoContext);
  const cryptos = ["bitcoin", "ethereum", "ripple"];

  const handleSelection = (e) => {
    cryptoContext.setCryptoCurrency(e.target.value);
  };

  return (
    <>
      <header className={styles["header"]}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          className={styles["header_logo"]}
        >
          Crypto Dashboard
        </Typography>
        <nav className={styles["header_nav"]}>
          <ul className={styles["main-nav__items"]}>
            <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Select Currency
              </InputLabel>
              <Select
                value={cryptoContext.cryptoCurrency}
                labelId="demo-simple-select-label"
                onChange={handleSelection}
                label="Select Currency"
                // sx={{ color: "white", marginRight: 2 }}
              >
                {cryptos.map((crypto) => (
                  <MenuItem key={crypto} value={crypto}>
                    {crypto.charAt(0).toLocaleUpperCase() + crypto.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <li>
              <Button
                component={NavLink}
                to="/Dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                component={NavLink}
                to="/Overview"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Overview
              </Button>
            </li>
            <li>
              <Button
                component={NavLink}
                to="/History"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                History
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
