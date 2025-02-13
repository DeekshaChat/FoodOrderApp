import {  useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export const UserProgressProvider = ({children}) => {
  const [progress, setProgress] =  useState('');

  function showCart() {
    setTimeout(() => {
      console.log('showcart', progress)
    }, 2000);
    
    setProgress('cart');
  }

  function hideCart() {

    setProgress('');
  }
  function showCheckout() {
    setTimeout(() => {
      console.log('showCheckout', progress)
    }, 3000);
    setProgress('checkout')
  }
  function hideCheckout() {
    setTimeout(() => {
      console.log('hideCheckout', progress)
    }, 2000);
    setProgress('')
  }

  const userProgressCtx = {
    progress: progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }

  return (
    <UserProgressContext value={userProgressCtx}>
      {children}
    </UserProgressContext>
  )
}

export default UserProgressContext;

