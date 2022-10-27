import "./../../App.css";
const NavBar = () => {
  return (
    <div>
      <header>
        <input type="checkbox" name="" id="toggler" />
        <label for="toggler" className="fas fa-bars"></label>

        <a href="/" className="logo">
          ShoppingCart<span>.</span>
        </a>

        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/product">Products</a>
          <a href="/cryptocurrency">CryptoCurrency</a>
          <a href="/products">ProductList</a>
          {/* <a href="#contact">contact</a> */}
        </nav>

        <div className="icons">
          {/* <a href="/" className="fas fa-heart">Heart</a>
          <a href="/" className="fas fa-shopping-cart">ShoppingCart</a>
          <a href="/" className="fas fa-user">User</a> */}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
