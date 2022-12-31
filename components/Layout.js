import Nav from "./nav/Nav";
import Footer from "./Footer";
const navItem = ["home", "blog", "about", "contact","subscribe"];

const Layout = ({ children }) => {
  return (
    <>
      <Nav navItem={navItem} />
      {children}
      <Footer navItem={navItem} />
    </>
  );
};

export default Layout;
