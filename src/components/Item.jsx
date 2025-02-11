import { use } from "react";
import CartContext from "../store/CartContext";
import Button from "./Button";

export default function Item({meal: {id, name,image, description, price}}) {
  // console.log('name', name);

  const context = use(CartContext);
  const quantity = context.items?.some((item) => item.id === id) ? context.items.find((item) => item.id === id).quantity : 0;
  console.log('quantity', context.items);
  
  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">${price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          { quantity ? (
            <>
              <Button onClick={() =>  context.removeItem(id)}>-</Button>
              <span className="span">{quantity}</span>
              <Button onClick={() =>  context.addItem({id, name,image, description, price})}>+</Button>
            </>
          ) : ( 
            <Button onClick={() =>  context.addItem({id, name,image, description, price})}>Add to Cart</Button>
          )}
          
        </p>
        </article>
    </li>
  )
    
}