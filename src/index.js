import React from "react";
import ReactDOM from "react-dom/client";
import ClassMessage from "./classMessage";
import FunctionalMessage from "./functionalMessage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <ClassMessage />
    <FunctionalMessage />
  </div>
);
