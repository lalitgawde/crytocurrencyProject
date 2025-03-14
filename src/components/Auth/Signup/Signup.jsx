import { Box, Button, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { CryptoContext } from "../../../store/CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useContext(CryptoContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    } else {
      if (password !== confirmPassword) {
        setAlert({
          open: true,
          message: "Passwords do not match",
          type: "error",
        });
        return;
      }

      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        });

        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      }
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
