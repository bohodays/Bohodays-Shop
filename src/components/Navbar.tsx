import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useState, useEffect } from "react";
import { userType } from "../types/user-type";
import User from "./User";

const Navbar = () => {
  const [user, setUser] = useState<userType>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to={"/"} className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Bohodays</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to={"/products"}>Products</Link>
        <Link to={"/carts"}>Carts</Link>
        {user && (
          <Link to={"/products/new"} className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && user.isAdmin && (
          <User photoURL={user.photoURL} displayName={user.displayName} />
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
