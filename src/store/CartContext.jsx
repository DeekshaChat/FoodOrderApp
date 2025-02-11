import { act, createContext, useReducer } from "react"

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});
console.log('CartContext', CartContext);

function CartReducer(state, action) {
  console.log('state', state, 'action', action);
  
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    console.log('updatedItems', updatedItems);
    
    const existingItemIndex = updatedItems.findIndex(item => item.id === action.item.id);
    if (existingItemIndex > -1) {
      const existingItem = updatedItems[existingItemIndex];
      const tempItem = {...existingItem, quantity: existingItem.quantity + 1};
      updatedItems[existingItemIndex] = tempItem;
    } else {
      updatedItems.push({...action.item, quantity: 1})
    }
    return {...state, items: updatedItems};
     
  } else if (action.type === 'REMOVE_ITEM') {
    const updatedItems = [...state.items];
    const existingItemIndex = updatedItems.findIndex(item => item.id === action.id);
    if (updatedItems[existingItemIndex].quantity === 1) {
      updatedItems.splice(existingItemIndex, 1); // removes 1 item at existingItemIndex
    } else {
      const existingItem = updatedItems[existingItemIndex]; 
      const tempItem = {...existingItem, quantity: existingItem.quantity - 1};
      updatedItems[existingItemIndex] = tempItem;
    }

    return {...state, items: updatedItems};
    
  }
  return state;
}

export function CartProvider({children}) {
  const [cart, cartDispatchAction] = useReducer(CartReducer, { items: []});


  function addItem(item) {
    console.log('add item');
    
    cartDispatchAction({type: 'ADD_ITEM', item: item});
  }

  function removeItem(id) {
    cartDispatchAction({type: 'REMOVE_ITEM', id: id});
  }

  
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  }

  console.log('cartContext',cart, cartContext);
  
  return (
    <CartContext value={cartContext}>
      {children}
    </CartContext>
  )
}

export default CartContext;