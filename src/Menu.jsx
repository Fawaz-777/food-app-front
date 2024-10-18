import { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { CartContext } from "./store/Cartcontext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Menu() {
  const cartCtx = useContext(CartContext);
  
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("https://food-app-6zxz.onrender.com/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError("There was an issue fetching the meals.");
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, []);

  if (loading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error) {
    return <p className="center">{error}</p>;
  }

  if (meals.length === 0) {
    return <p className="center">There is no food today.</p>;
  }

  function handleAddMealToCart(meal) {
    cartCtx.addItem(meal);
    toast.success('🍔 Added to your cart!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  return (
    <>
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
                <Button onClick={() => handleAddMealToCart(meal)}>Add to cart</Button>
              </p>
            </article>
          </li>
        ))}
      </ul>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
