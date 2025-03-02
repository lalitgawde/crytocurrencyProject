import React, { useEffect, useState, useContext } from "react";
import { CryptoContext } from "../../store/CryptoContext";
import { Button, Grid } from "@mui/material";
import style from "./History.module.css";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularLoader from "../UI/CircularLoader";
import SearchInput from "../UI/SearchInput";
import TablePagination from "@mui/material/TablePagination";
import { fetchHistoricalData } from "../../utils/FetchHistoricalData";

function History(props) {
  const [historyData, setHistoryData] = useState([]);
  const cryptoContext = useContext(CryptoContext);
  const [searchHistoryData, setSearchHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setformState] = useState({
    success: false,
    error: false,
    msg: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setformState(() => ({
      success: false,
      error: false,
      msg: "",
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchHistoricalData(cryptoContext.cryptoCurrency).then((res) => {
      const historyData = [];
      if (res.message === "Data Fetch Successfully") {
        for (let i = 0; i < res.data.length; i++) {
          const obj = {
            time: new Date(res.data[i].time),
            // price: Math.round(+res.data[i].priceUsd),
            price: +res.data[i].priceUsd.toFixed(2),
            date: new Date(res.data[i].time),
          };
          historyData.push(obj);
        }
        setHistoryData(historyData);
        setSearchHistoryData(historyData); // Save for reset functionality
      }
      setIsLoading(false);
    });
  }, [cryptoContext.cryptoCurrency]);

  const onSearchHandler = (searchValue) => {
    const search = searchHistoryData.filter(
      (item) => item.price == searchValue
    );
    console.log("serch", search);
    setHistoryData(search);
  };

  const resetHandle = () => {
    setHistoryData(searchHistoryData);
  };

  // Get the current slice of data based on pagination
  const paginatedData = historyData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return cryptoContext.cryptoCurrency !== "" ? (
    <div>
      {isLoading ? <CircularLoader /> : null}
      <Grid container>
        <Grid
          item
          xs={8}
          ms={6}
          className={style.searchContainer}
          style={{
            padding: "28px 16px",
          }}
        >
          <SearchInput
            className={style.input}
            onSearchHandler={onSearchHandler}
            resetHandle={resetHandle}
          />
        </Grid>
        {(formState.error || formState.success) && (
          <Grid item xs={3}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 2, mb: 0 }}
              variant="filled"
              severity={formState.error ? "error" : "success"}
            >
              {formState.msg}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} style={{ margin: "30px 10px 30px 10px" }}>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((exp, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    {exp.date.toISOString().split("T")[0]}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {exp.time.toLocaleTimeString("en-US")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    ${exp.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={historyData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-toolbar": {
                fontSize: "1.2rem",
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                fontSize: "1.1rem",
              },
              ".MuiTablePagination-actions": {
                fontSize: "1.1rem",
              },
            }}
          />
        </Grid>
      </Grid>
      {historyData.length === 0 && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "18px",
          }}
        >
          No Data Found.
        </div>
      )}
    </div>
  ) : (
    <div className={styles.Heading}>
      <h2>Please Select the CryptoCurrency</h2>
    </div>
  );
}

export default History;
