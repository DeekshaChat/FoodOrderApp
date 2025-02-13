import { use } from "react";
import CartContext from "../store/CartContext"
import UserProgressContext from "../store/UserProgressContext";
import Button from "./Button";
import Modal from "./Modal";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = use(CartContext);
  const userProgressContext = use(UserProgressContext);
  const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  console.log('cartContext.items===',cartContext.items)
  return (
    <Modal className="cart" open={userProgressContext.progress === 'cart'}
    onClose={userProgressContext.progress === 'cart' ? userProgressContext.hideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {
          cartContext.items?.map((item) => (
          <CartItem
            key = {item.id}
            name = {item.name}
            quantity = {item.quantity}
            onAdd={() => cartContext.addItem(item)}
            onRemove={() => cartContext.removeItem(item.id)}
          />
          ))
        }
      </ul>
      <p className="cart-total">
        {cartTotal}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={userProgressContext.hideCart}>Close</Button>
        {cartContext.items.length > 0 && <Button onClick={userProgressContext.showCheckout}>Checkout</Button>}
      </p>
    </Modal>
  )
}