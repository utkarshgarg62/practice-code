import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/cryptoCurrency.css"

const crypto_api = "https://api.coincap.io/v2/assets";

const CryptoCurrency = () => {
  const [cryptoList, setCryptoList] = useState();

  useEffect(() => {
    if (!cryptoList) {
      axios.get(crypto_api).then((response) => {
        console.log(response.data.data);
        setCryptoList(response.data.data)
      });
    }
  });

  return (
    <div>
      <h1>Crypto Currency List</h1>
      <div className="crypto-container">
        {cryptoList && cryptoList.length > 0 && (
          <ol>
            {cryptoList.map((coin, index) => (
              <li>{coin.name} [ Symbol - {coin.symbol} ]  <a href={coin.explorer}>Details</a></li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
export default CryptoCurrency;
