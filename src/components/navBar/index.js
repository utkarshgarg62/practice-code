import "./index.css"
const NavBar = () => {
  return (
    <div>
      <div class="topnav">
        <a class="active" href="/">
          Home
        </a>
        <a href="/product">Product</a>
        <a href="/payment">Payment</a>
        <a href="/cryptocurrency">Crypto Currency</a>
      </div>
    </div>
  );
};

export default NavBar;
