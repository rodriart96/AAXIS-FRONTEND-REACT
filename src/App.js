import React, { useState, useEffect } from "react";
import "./App.css";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

function App() {
  const apiKey = process.env.REACT_APP_API_CURRENCY_KEY;
  const [currencyRate, setCurrencyRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangedCurrency, setExchangedCurrency] = useState("EUR");
  const [amountToExchange, setAmountToExchange] = useState(30);
  const [amountExchanged, setAmountExchanged] = useState(null);

  const freecurrencyapi = new Freecurrencyapi(apiKey);

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

  useEffect(() => {
    getCurrencyConversion();
    const  unformattedAmount = amountToExchange * currencyRate;
    const roundedAmountExchanged = unformattedAmount.toFixed(2);
    const formattedAmountExchanged = parseFloat(roundedAmountExchanged);
    setAmountExchanged(formattedAmountExchanged);
  }, [currencyRate, amountToExchange, exchangedCurrency, baseCurrency])
  

  return (
    <div className="App">
      <header className="App-header">
        <p> amount to exchange:  {amountToExchange} {baseCurrency}</p>
        <p> Exchanged Amount: {exchangedCurrency} {amountExchanged}</p>
        <p>
         <code>${currencyRate}</code>.
        </p>
      </header>
    </div>
  );
}

export default App;
