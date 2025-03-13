import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Coursel from "../Coursel/Coursel";
import classes from "./Banner.module.css";
import bannerImage from "../../assets/banner2.jpg";

function Banner(props) {
  return (
    <div
      style={{ backgroundImage: `url(${bannerImage})` }}
      className={classes.banner}
    >
      <Container className={classes.bannerContainer}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
              // fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Coursel />
      </Container>
    </div>
  );
}

export default Banner;
