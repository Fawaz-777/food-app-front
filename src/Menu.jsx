import { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { CartContext } from "./store/Cartcontext";

export default function Menu() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("https://food-app-6zxz.onrender.com/meals");
        const data = await response.json();
        setMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    }

    fetchMeals();
  }, []);

  if (loading) {
    return <p className="center">Loading meals...</p>;
  }

  if (meals.length === 0) {
    return <p className="center">There is no food today.</p>;
  }

  const cartCtx = useContext(CartContext);

  // Correctly pass the specific meal to the cart
  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <li key={meal.id} className="meal-item">
          <article>
            <img src={`https://food-app-6zxz.onrender.com/${meal.image}`} alt={meal.name} />
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-item-price">${meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-action">
              {/* Pass the individual meal to the handler */}
              <Button onClick={() => handleAddMealToCart(meal)} children="Add to cart" />
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
