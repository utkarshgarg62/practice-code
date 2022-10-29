import { Outlet } from "react-router-dom";
import Header from "./header";
const HomePage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomePage;
