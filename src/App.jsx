import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultRoute from "./DefaultRoute";
import CryptoContextProvider from "./store/CryptoContext";
import Footer from "./components/Layout/Footer/Footer";
import UserContextProvider from "./store/UserContext";
import AlertBar from "./components/Auth/Alert";

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
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <AlertBar />
          <DefaultRoute />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </UserContextProvider>
  </CryptoContextProvider>
);

export default App;
