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
            {cryptoList.map((coin) => (
              <li>
                <span className="name">{coin.name} </span>
                <span className="symbol">[ Symbol - {coin.symbol} ]</span>
                <span className="details"> <a href={coin.explorer}>Details</a></span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
export default CryptoCurrency;
