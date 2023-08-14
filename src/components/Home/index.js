import { useEffect, useState, useMemo } from "react";

import { TailSpin } from "react-loader-spinner";

import Header from "../Header";
import TabDash from "../TabDash";

import "./index.css";
import FoodItems from "../FoodItems";

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [activeTab, setActiveTab] = useState();

  const [loading, setLoading] = useState(false);

  const getTheData = async () => {
   

    const response = await fetch(
      "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099"
    );
    const data = await response.json();

    const formattedData = data[0].table_menu_list.map((eachItem) => ({
      categoryDishes: eachItem.category_dishes,
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      menuCategoryImage: eachItem.menu_category_image,
      nextUrl: eachItem.nexturl,
    }));

    setRestaurantList(formattedData);
    setActiveTab(formattedData[0].menuCategoryId);

  };

  useEffect(() => {
    getTheData();
  }, []);

  const tabClick = (id) => {
    setActiveTab(id);
  };

  const filteredItems = restaurantList.filter(
    (eachItem) => activeTab === eachItem.menuCategoryId
  );

  const indexFilteredItems = filteredItems.length > 0 ? filteredItems[0] : null;
  const categoryDishes = indexFilteredItems?.categoryDishes || [];

  const filteredFormattedItems = categoryDishes.map((eachItem) => ({
    dishAvailability: eachItem.dish_Availability,
    dishType: eachItem.dish_Type,
    dishCalories: eachItem.dish_calories,
    dishCurrency: eachItem.dish_currency,
    dishDescription: eachItem.dish_description,
    dishId: eachItem.dish_id,
    dishImage: eachItem.dish_image,
    dishName: eachItem.dish_name,
    dishPrice: eachItem.dish_price,
    nextUrl: eachItem.nexturl,
  })); 


  return (
    <>
      <Header />
      <ul className="un-order-tabs-container">
        {restaurantList.map((eachItem) => (
          <TabDash
            active={eachItem.menuCategoryId === activeTab}
            eachItem={eachItem}
            key={eachItem.menuCategoryId}
            tabClick={tabClick}
          />
        ))}
      </ul>
      {
        <ul className="food-items-un-ordered-container">
          {filteredFormattedItems.map((eachItem) => (
            <FoodItems key={eachItem.dishId} eachItem={eachItem} />
          ))}
        </ul>
      }
    </>
  );
};

export default Home;
