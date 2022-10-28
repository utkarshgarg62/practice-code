import React, { useState, useEffect } from "react";
import axios from "axios";

// import "./style/cryptoCurrency-style1.css";
import "./style/cryptoCurrency-style2.css";

const crypto_api = "https://api.coincap.io/v2/assets";

const CryptoCurrency = () => {
  const [cryptoList, setCryptoList] = useState();

  useEffect(() => {
    if (!cryptoList) {
      axios.get(crypto_api).then((response) => {
        console.log(response.data.data);
        setCryptoList(response.data.data);
      });
    }
  });

  return (
    <div>
      <h1>Crypto Currency List</h1>
      {/* STYLE 1 */}
      {/* <div className="crypto-container">
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
      </div> */}

      {/* STYLE 2 */}
      <div className="user-container">
        {cryptoList && cryptoList.length > 0 && (
          <ol>
            {cryptoList.map((coin) => (
              <li>
                <span className="crypto-container">
                  <span className="user-name">{coin.name} </span>
                  <span className="price">
                    <span>Price - {coin.priceUsd}</span>
                    <span>
                      {" "}
                      Full -<a href={coin.explorer}>Details</a>
                    </span>
                  </span>
                  <span className="user-details">{coin.symbol}</span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
export default CryptoCurrency;
