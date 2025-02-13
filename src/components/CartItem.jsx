import React from 'react'

export default function CartItem({ name, quantity, onAdd, onRemove}) {
  return (
    <li className='cart-item'>
    {name} - {quantity}
    <p className='cart-item-actions'>
      <button onClick={onRemove}>-</button>
      <span>{quantity}</span>
      <button onClick={onAdd}>+</button>
    </p>
   </li>
  )
}
