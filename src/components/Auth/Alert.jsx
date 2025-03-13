import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CryptoContext } from "../../store/CryptoContext";

function AlertBar() {
  const { alert, setAlert } = useContext(CryptoContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false, message: "", type: "" });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alert.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertBar;
