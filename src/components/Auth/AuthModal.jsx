import React, { useContext } from "react";
import classes from "./AuthModal.module.css";
import { AppBar, Box, Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Modal from "@mui/material/Modal";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import GoogleButton from "react-google-button";
import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoContext } from "../../store/CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("login");
  const { setAlert } = useContext(CryptoContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        <div className={classes.paper} style={style}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="white"
              indicatorColor="secondary"
              aria-label="wrapped label tabs example"
            >
              <Tab value="login" label="Login" sx={{ color: "white" }} />
              <Tab value="signup" label="Sign Up" sx={{ color: "white" }} />
            </Tabs>
          </AppBar>
          {value === "login" && <Login handleClose={handleClose} />}
          {value === "signup" && <Signup handleClose={handleClose} />}
          <Box className={classes.google}>
            <span>OR</span>
            <GoogleButton
              style={{ width: "100%", outline: "none" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </div>
        {/* </Box> */}
      </Modal>
    </div>
  );
}
export default AuthModal;
