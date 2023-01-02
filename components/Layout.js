import Nav from "./nav/Nav";
import Footer from "./Footer";
import Meta from "./Meta";
const navItem = ["home", "blog", "about", "contact", "subscribe"];

const Layout = ({ children }) => {
  return (
    <main className="scroll-smooth">
      <Meta />
      <Nav navItem={navItem} />
      {children}
      <Footer navItem={navItem} />
    </main>
  );
};

export default Layout;
