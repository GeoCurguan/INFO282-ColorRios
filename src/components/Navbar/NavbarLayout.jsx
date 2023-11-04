import Nav from "./Nav";
const Navbar = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Navbar;
