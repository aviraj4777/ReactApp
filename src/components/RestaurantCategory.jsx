import ItemList from "./itemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  // Uncontrolled component -> As the parent don't have control on drop down and collapsing feature
  // const [showItems, setShowItems] = useState(false);

  // const handleClick = () => {
  //   setShowItems(!showItems);
  // };

  const handleClick = () => {
    setShowIndex();
  };

  // console.log(data);
  return (
    <div>
      {/*Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {/* Accordion Body */}
        {/* {console.log(data.itemCards)} */}
        {showItems && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;
