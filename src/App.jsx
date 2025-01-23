import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultRoute from "./DefaultRoute";
import CryptoContextProvider from "./store/CryptoContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

const App = () => (
  <CryptoContextProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <DefaultRoute />
      </BrowserRouter>
    </ThemeProvider>
  </CryptoContextProvider>
);

export default App;
