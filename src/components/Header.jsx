import { use } from 'react';
import Logo from '../../public/logo.jpg'
import Button from './Button'
import UserProgress from '../store/UserProgressContext';
import CartContext from '../store/CartContext';
export default function Header() {

  const userProgressCtx = use(UserProgress);
  const cartContext =  use(CartContext);

  const total = cartContext.items.reduce((totalitem, item) => totalitem + item.quantity,0);
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={Logo} alt='logo' />
        <h1>Fomato</h1>
      </div>
      <nav >
        <Button textOnly onClick={() => {
          userProgressCtx.showCart();
          }}>
          Cart ({total})
        </Button>
      </nav>
    </header>
  )
}