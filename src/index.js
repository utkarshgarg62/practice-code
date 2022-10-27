import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import Product from "./components/pages/productPage";
import Payment from "./components/pages/paymentPage";
import HomePage from "./components/pages/homePage";
import ErrorPage from "./components/pages/errorPage";
import CryptoCurrency from "./components/pages/cryptoCurrency";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <div>
      <App />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="payment" element={<Payment />}></Route>
        <Route path="cryptocurrency" element={<CryptoCurrency />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);
