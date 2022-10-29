import React from "react";
import Header from "../header";
import { NavLink } from "react-router-dom";

const errPage = () => {
  return (
    <div>
      <Header />
      <section>
        <h3>
          Error. Go Back to
          <NavLink to="/">Home Page</NavLink>
        </h3>
      </section>
    </div>
  );
};

export default errPage;
