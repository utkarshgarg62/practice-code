import React from "react";
import ReactDOM from "react-dom/client";

import MainHeader from "./components/mainHeader";
import HomePage from "./components/pages/homePage";
import BooksList from "./components/pages/booksList";
import ErrPage from "./components/pages/errPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route index element={<HomePage />}></Route>
          <Route path="bookslist" element={<BooksList />}></Route>
        </Route>
        <Route path="*" element={<ErrPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
