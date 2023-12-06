import React, { useState, useEffect, Fragment } from "react";
import {  Box,  Typography,  MenuItem,  FormControl,  Select,  TextField} from "@mui/material";
import "../App.css";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

export default function ExchangeTable() {
  const apiKey = process.env.REACT_APP_API_CURRENCY_KEY;
  const [currencyRate, setCurrencyRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangedCurrency, setExchangedCurrency] = useState("EUR");
  const [amountToExchange, setAmountToExchange] = useState(0);
  const [amountExchanged, setAmountExchanged] = useState(0);
  const freecurrencyapi = new Freecurrencyapi(apiKey);

  const handleCurrencyChange = (event, currencyExchanger) => {
    currencyExchanger === baseCurrency
      ? setBaseCurrency(event.target.value)
      : setExchangedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmountToExchange(event.target.value);
  };

  const getCurrencyConversion = async () => {
    try {
      const response = await freecurrencyapi.latest({
        base_currency: baseCurrency,
        currencies: exchangedCurrency,
      });
      setCurrencyRate(response.data[exchangedCurrency]);
    } catch (error) {
      console.error("Error fetching currency conversion:", error);
    }
  };

  const currencyFormatter = () => {
    const unformattedAmount = amountToExchange * currencyRate;
    const roundedAmountExchanged = unformattedAmount.toFixed(2);
    const formattedAmountExchanged = parseFloat(roundedAmountExchanged);
    setAmountExchanged(formattedAmountExchanged);
  };

  useEffect(() => {
    getCurrencyConversion();
    currencyFormatter();
  }, [currencyRate, amountToExchange, exchangedCurrency, baseCurrency]);
  return (
    <Fragment>
      <div>
        <Typography variant="h5" htmlFor="dropdown">Choose a currency </Typography>
        <Box className="currencySelectorContainer">
          <FormControl variant="filled" fullWidth sx={{ minWidth: "120px" }}>
            <Select
              sx={{ color: "#F0ECE5" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={baseCurrency}
              label="Currency"
              onChange={(e) => handleCurrencyChange(e, baseCurrency)}
            >
              <MenuItem value={"USD"}>US Dollar</MenuItem>
              <MenuItem value={"EUR"}>Euro</MenuItem>
              <MenuItem value={"HUF"}>Forint</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ minWidth: "200px", input: { color: "#F0ECE5" } }}
            InputLabelProps={{ style: { color: "#F0ECE5" } }}
            id="filled-basic"
            label="Amount"
            variant="filled"
            onChange={handleAmountChange}
          />
        </Box>
      </div>

      <div>
        <Box className="currencySelectorContainer">
          <FormControl variant="filled" fullWidth sx={{ minWidth: "140px" }}>
            <Select
              sx={{ color: "#F0ECE5" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchangedCurrency}
              label="Currency"
              onChange={(e) => handleCurrencyChange(e, exchangedCurrency)}
            >
              <MenuItem value={"USD"}>US Dollar</MenuItem>
              <MenuItem value={"EUR"}>Euro</MenuItem>
              <MenuItem value={"HUF"}>Forint</MenuItem>
            </Select>
          </FormControl>
          <Typography
            className="currencySelector"
            id="filled-basic"
            label="Amount"
            variant="filled"
            onChange={handleAmountChange}
          >
            {amountExchanged}
          </Typography>
        </Box>
      </div>

      <Box sx={{ marginTop: "3vh" }}>
        <Typography variant="h6">
          {" "}
          Exchanged Amount: {exchangedCurrency} {amountExchanged}{" "}
        </Typography>
        <Typography>
          {" "}
          1 {baseCurrency} = {exchangedCurrency} {currencyRate}{" "}
        </Typography>
      </Box>
    </Fragment>
  );
}
