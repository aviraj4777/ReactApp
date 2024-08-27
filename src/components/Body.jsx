import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
// import resObj from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "/src/utils/UserContext";

// This is normal JS variable but it doesn't keep our app in sync with ui whenever some changes are done to our app.
// let listOfRest = [
//   {
//     info: {
//       id: "68533",
//       name: "Vijay Dairy",
//       cloudinaryImageId: "jrrxcxw1yvw9yitglfpt",
//       costForTwo: "₹200 for two",
//       cuisines: ["Beverages", "Bakery", "Ice Cream"],
//       avgRating: 4.8,
//       avgRatingString: "4.8",
//       totalRatingsString: "10K+",
//       sla: {
//         deliveryTime: 34,
//         lastMileTravel: 8.4,
//         serviceability: "SERVICEABLE",
//         slaString: "30-35 mins",
//         lastMileTravelString: "8.4 km",
//         iconType: "ICON_TYPE_EMPTY",
//       },
//     },
//   },
//   {
//     info: {
//       id: "68534",
//       name: "Dominos",
//       cloudinaryImageId: "jrrxcxw1yvw9yitglfpt",
//       costForTwo: "₹200 for two",
//       cuisines: ["Beverages", "Bakery", "Ice Cream"],
//       avgRating: 4.1,
//       avgRatingString: "4.8",
//       totalRatingsString: "10K+",
//       sla: {
//         deliveryTime: 34,
//         lastMileTravel: 8.4,
//         serviceability: "SERVICEABLE",
//         slaString: "30-35 mins",
//         lastMileTravelString: "8.4 km",
//         iconType: "ICON_TYPE_EMPTY",
//       },
//     },
//   },
//   {
//     info: {
//       id: "68535",
//       name: "Burger King",
//       cloudinaryImageId: "jrrxcxw1yvw9yitglfpt",
//       costForTwo: "₹200 for two",
//       cuisines: ["Beverages", "Bakery", "Ice Cream"],
//       avgRating: 3.8,
//       avgRatingString: "4.8",
//       totalRatingsString: "10K+",
//       sla: {
//         deliveryTime: 34,
//         lastMileTravel: 8.4,
//         serviceability: "SERVICEABLE",
//         slaString: "30-35 mins",
//         lastMileTravelString: "8.4 km",
//         iconType: "ICON_TYPE_EMPTY",
//       },
//     },
//   },
// ];

const Body = () => {
  //React State Variable
  const [listOfRest, setListOfRest] = useState([]);

  const [filteredRest, setFilteredRest] = useState([]);

  const [searchText, setSearchText] = useState("");

  // const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  //UseEffect Hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.73390&lng=76.78890&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    setListOfRest(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRest(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  console.log(listOfRest);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline !! Please check your internet connection{" "}
      </h1>
    );
  const { loggedInUser, setUserName } = useContext(userContext);
  // conditional rendering, we can use a ternary opereator for conditional rendering
  if (listOfRest.length == 0) {
    return <Shimmer />;
  }
  return (
    <div className="body bg-gray-50 p-6 rounded-lg shadow-lg">
      <div className="filter flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full md:w-1/3"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 ease-in-out"
            onClick={() => {
              const filteredList = listOfRest.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRest(filteredList);
            }}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 ease-in-out"
            onClick={() => {
              const filteredList = listOfRest.filter(
                (rest) => rest?.info?.avgRating > 4.4
              );
              setListOfRest(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">User Name:</label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full md:w-1/3"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1">
          {filteredRest.map((resData) => (
            <Link
              key={resData?.info?.id}
              to={"/restaurants/" + resData?.info?.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              {resData?.info?.promoted ? (
                <withPromtedLabel resData={resData} />
              ) : (
                <RestaurantCard resData={resData} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
