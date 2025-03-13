import React, { useEffect, useState, useContext } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link, useHistory } from "react-router-dom";
import classes from "./Coursel.module.css";
import { CryptoContext } from "../../store/CryptoContext";
import { FetchAllCryptoCurrency } from "../../utils/FetchAllCryptoCurrency";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Coursel(props) {
  const history = useHistory();
  const cryptoContext = useContext(CryptoContext);
  const [trendingCurrency, setTrendingCurrency] = useState([]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trendingCurrency.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <div
        className={classes.carouselItem}
        // to={`/coins/${coin.id}`}
        onClick={() => {
          cryptoContext.setCryptoCurrency(coin.id);
          history.push("/Dashboard/" + coin.id);
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {cryptoContext.currency === "USD" ? "$" : "₹"}{" "}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });

  useEffect(() => {
    cryptoContext.setCryptoCurrency("");
    if (cryptoContext.currency) {
      FetchAllCryptoCurrency(cryptoContext.currency)
        .then((data) => {
          console.log("data", data);
          setTrendingCurrency(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cryptoContext.currency]);

  return (
    <div className={classes.coursel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
}

export default Coursel;
