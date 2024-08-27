import Shimmer from "./Shimmer";
import { useState } from "react"
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resDetails = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resDetails === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resDetails?.cards[2]?.card?.card?.info;
  const itemCards =
    resDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card
      ?.card?.itemCards;

  const categories =
    resDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(categories);

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl my-6">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordion */}
      {categories.map((category, index) => (
        // This is a controlled component as it will set the showItem for ItemList, whether it has to show or not
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
