import { useDispatch, useSelector } from "react-redux";
import ItemList from "./itemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-4 pb-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h1>
        <div className="w-full">
          {cartItems.length > 0 ? (
            <ItemList items={cartItems} />
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty, Add some item to cart.</p>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          {cartItems.length != 0 && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
