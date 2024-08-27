import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import userContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { loggedInUser } = useContext(userContext);

  //Destructuring an object
  const { cloudinaryImageId, name, cuisines, avgRatingString, sla } =
    resData?.info;

  return (
    <div className="m-4 p-4 w-[250px] bg-white shadow-lg hover:shadow-xl rounded-lg transition-all duration-300 ease-in-out">
      <img
        alt="res-img"
        className="rounded-t-lg w-full h-[150px] object-cover"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="res-info p-4">
        <h3 className="font-bold text-xl text-gray-800">{name}</h3>
        <h4 className="text-gray-600 text-sm mt-1">{cuisines.join(", ")}</h4>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            ⭐ {avgRatingString}
          </span>
          <span className="text-gray-500">{sla?.deliveryTime} mins</span>
        </div>
        <h4 className="mt-4 text-sm text-gray-500">User: {loggedInUser}</h4>
      </div>
    </div>
  );
};

// Higher Order Components -> Take componenet as an input and returns a component (a pure function)
// input - RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-lg">
          Promoted
        </span>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

// All the react application is made up of two layers - i) UI Layer ii) Data Layer
// This UI Layer is powered by data layer.

export default RestaurantCard;
