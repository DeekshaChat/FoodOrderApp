import React from 'react'
import Input from './Input'
import { use } from 'react'
import UserProgressContext from '../store/UserProgressContext'
import Button from './Button';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import { useFetch } from '../hooks/useFetch';

let requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: null
};
export default function Checkout({open, }) {
  const userProgressContext = use(UserProgressContext);
  const cartContext = use(CartContext);

  const { data, isLoading, error, requestApi, clearData} = useFetch(null, 'http://localhost:3000/orders', requestConfig);
  
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    checkoutApi(data);
  }

  function successClick() {
    if (data?.success) {
      userProgressContext.hideCheckout();
      cartContext.clearCart();
      clearData();
    }
  }
  async function checkoutApi(val) {
    try {
      const apiBody = {
        order: {
          items: cartContext.items,
          customer: val
        }
      };
      requestConfig.body = JSON.stringify(apiBody);
      await requestApi();

    } catch (error) {
      console.log('error====', error);
    }
  }

  if (data?.success && !error) {
    return (
      <Modal open={userProgressContext.progress === 'checkout'}
      onClose={ userProgressContext.progress === 'checkout' ? userProgressContext.hideCheckout : null}>
        <h2>Success</h2>
        <p>
          Your order is in placed successfully.
        </p>
        <p className='modal-actions'>
          <Button type='button' textOnly onClick={successClick}>Close</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal open={userProgressContext.progress === 'checkout'}
    onClose={ userProgressContext.progress === 'checkout' ? userProgressContext.hideCheckout : null}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <Input label={'Name'} type='text' id='name'/>
        <Input label={'Email'} type='email' id='email'/>
        <Input label={'Street'} type='text' id='street'/>
        <div className='control-row'>
          <Input label={'City'} type='text' id='city'/>
          <Input label={'Pincode'} type='number' id='postal-code'/>
        </div>
        <p className='modal-actions'>
          {isLoading ? 
          <span>Order request in process</span>
          :
          <>
             <Button type='button' textOnly onClick={userProgressContext.hideCheckout}>Close</Button>
             <Button onClick={userProgressContext.showCheckout}>Submit Order</Button>
          </>
        }
        </p>
      </form>
    </Modal>
  )
}
