import { LuVegan } from "react-icons/lu";

import "./index.css";

const FoodItems = (props) => {
  const { eachItem } = props;

  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    nextUrl,
  } = eachItem;

  return (
    <li className="foodItem-container">
      <div className="description-container">
        <LuVegan color={dishAvailability ? "green" : "red"} />
        <h1 className="dis-name">{dishName}</h1>
        <p className="sar-dish">{dishCurrency} {dishPrice}</p>
        <p className="dish-description">{dishDescription}</p> 
       
        {!dishAvailability? <p className="not-available">Not Available</p> :  <div className="quantity-container-buttons">
            <button>-</button><p>0</p><button>+</button>
        </div>}
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img className="food-image-size" src={dishImage} alt={dishName} />
    </li>
  );
};

export default FoodItems;
