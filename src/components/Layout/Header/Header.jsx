import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import styles from "./Header.module.css";
import { CryptoContext } from "../../../store/CryptoContext";

const Header = () => {
  const history = useHistory();
  const cryptoContext = useContext(CryptoContext);
  const currency = cryptoContext.cryptoCurrency;
  const cryptos = ["USD", "INR"];
  const handleSelection = (e) => {
    cryptoContext.setCurrency(e.target.value);
  };

  const onHomeHandler = (e) => {
    history.push("/");
  };

  return (
    <>
      <header className={styles["header"]}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          className={styles["header_logo"]}
          onClick={onHomeHandler}
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
                value={cryptoContext.currency}
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
                to={`/Dashboard/${currency}`}
                className={({ isActive }) => (isActive ? styles.active : "")}
                disabled={cryptoContext.cryptoCurrency === ""}
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                component={NavLink}
                to={`/Overview/${currency}`}
                className={({ isActive }) => (isActive ? styles.active : "")}
                disabled={cryptoContext.cryptoCurrency === ""}
              >
                Overview
              </Button>
            </li>
            <li>
              <Button
                component={NavLink}
                to={"/History/" + currency}
                className={({ isActive }) => (isActive ? styles.active : "")}
                disabled={cryptoContext.cryptoCurrency === ""}
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
