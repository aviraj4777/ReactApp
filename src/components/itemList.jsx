import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-4 m-4 border rounded-lg shadow-md bg-white flex justify-between hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="w-8/12">
            <div className="pb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <p className="text-md text-gray-600">
                ₹
                {item?.card?.info?.price
                  ? (item?.card?.info?.price / 100).toFixed(2)
                  : (item?.card?.info?.defaultPrice / 100).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {item?.card?.info?.description}
            </p>
          </div>
          <div className="w-4/12 flex flex-col items-end">
            <img
              className="object-cover rounded-lg shadow-sm mb-4"
              src={CDN_URL + item?.card?.info?.imageId}
              alt={item?.card?.info?.name}
              style={{ width: "100px", height: "100px" }}
            />
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
