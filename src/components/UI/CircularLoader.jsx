import React from "react";
import style from "./CircularLoader.module.css";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function CircularLoader(props) {
  const cssStyles =
    props?.loaderType === "ScheduleExpense" ? { height: "120vh" } : {};

  console.log("cssStyles", cssStyles);
  return (
    <div className={style.loader} style={cssStyles}>
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2, color: "white" }}>
        Loading...
      </Typography>
    </div>
  );
}

export default CircularLoader;
