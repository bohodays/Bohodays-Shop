import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout } from "../api/firebase";
import User from "./User";
import Button from "./UI/Button";
import { useAuthContext } from "./context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useAuthContext() || {};
  console.log(login);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to={"/"} className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Bohodays</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to={"/products"}>Products</Link>
        {user && <Link to={"/carts"}>Carts</Link>}
        {user && (
          <Link to={"/products/new"} className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && user.isAdmin && (
          <User photoURL={user.photoURL} displayName={user.displayName} />
        )}
        {user ? (
          <Button text={"Logout"} onClick={logout} />
        ) : (
          <Button text={"Login"} onClick={login} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
