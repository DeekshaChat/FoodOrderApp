import { useEffect, useState } from "react";
import Item from "./components/Item";
import Header from "./components/Header";
import { CartProvider } from "./store/CartContext";

function App() {
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    async function callApi(){
      const response = await fetch('http://localhost:3000/meals');
      const data = await response.json();
      console.log('data====', data);
      setMealsData(data);
    }

    callApi();
  }, []);
  
  return (
    <CartProvider>
      <Header />
      <ul id='meals'>
        {mealsData.map((meal) => (
          <Item meal ={meal} key={meal.id} />
        ))}
      </ul>
    </CartProvider>
  );
}

export default App;
