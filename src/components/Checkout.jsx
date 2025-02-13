import React from 'react'
import Input from './Input'
import { use } from 'react'
import UserProgressContext from '../store/UserProgressContext'
import Button from './Button';
import Modal from './Modal';
import CartContext from '../store/CartContext';

export default function Checkout({open, }) {
  const userProgressContext = use(UserProgressContext);
  const cartContext = use(CartContext);
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    checkoutApi(data);
  }

  function checkoutApi(data) {
    try {
      const apiBody = {
        order: {
          items: cartContext.items,
          customer: data
        }
      };
      console.log('apiBody',apiBody);
      fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiBody)
      }).then(res => res.json())
      .then(response => {
        if (response.success) {
          userProgressContext.hideCheckout();
        }
      })
      .catch(err => {
        console.log('err====', err);
      });
    } catch (error) {
      console.log('error====', error);
    }
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
          <Button type='button' textOnly onClick={userProgressContext.hideCheckout}>Close</Button>
          <Button onClick={userProgressContext.showCheckout}>Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}
