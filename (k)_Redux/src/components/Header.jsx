import AddToCart from "./AddToCart";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyApp</div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/contact">Contact</a>
      </nav>

      <AddToCart/>
    </header>
  );
};

export default Header;
