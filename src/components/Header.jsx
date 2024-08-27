import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  // Always create useState Hook inside a component.
  // Try to keep it on the top of your component.
  // Never create a useState variable inside a if statement.
  // Never create a useState variable inside a function or inside a for Loop
  const [btnLogin, setBtnLogin] = useState("LogIn");
  const onlineStatus = useOnlineStatus();
  // If no dependency array => useEffect is called for every render.
  // If dependency array is empty = [] => useEffect is called on initial render (just once)
  // If dependency array is [btnLogin] => called everyTime btnLogin is updated

  const data = useContext(userContext);

  const { loggedInUser } = data;

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between bg-pink-200 shadow-lg font-bold text-lg">
      <div className="logo-container">
        <img className="w-2/6 mix-blend-multiply" src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center justify-between mx-4">
        <ul className="flex gap-x-10 items-center">
          <li className="pt-2">Online Status : {onlineStatus ? "✅" : "🔴"}</li>
          <li className="pt-2">
            <Link to="/"> Home </Link>
          </li>
          <li className="pt-2">
            <Link to="/about"> About</Link>
          </li>
          <li className="pt-2">
            <Link to="/menu"> Menu </Link>
          </li>
          <li className="pt-2">
            <Link to="/contact"> Contact Us</Link>
          </li>
          <li className="pt-2 font-bold">
            <Link to="/cart">Cart - ({cartItems.length} items) </Link>
          </li>
          <li>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                if (btnLogin === "LogIn") setBtnLogin("LogOut");
                else if (btnLogin === "LogOut") setBtnLogin("LogIn");
              }}
            >
              {btnLogin}
            </button>
          </li>
          <li className="pt-2">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
