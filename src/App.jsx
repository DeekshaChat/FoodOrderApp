import Item from "./components/Item";
import Header from "./components/Header";
import { CartProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { useFetch } from "./hooks/useFetch";

let requestConfig = { method: 'GET' };
function App() {
  const {data: mealsData} = useFetch([], 'http://localhost:3000/meals', requestConfig);

  return (
    <UserProgressProvider>
      <CartProvider>
        <Header />
        <ul id='meals'>
          {mealsData?.map((meal) => (
            <Item meal ={meal} key={meal.id} />
          ))}
        </ul>
        <Cart />
        <Checkout/>
      </CartProvider>
    </UserProgressProvider>
  );
}

export default App;
