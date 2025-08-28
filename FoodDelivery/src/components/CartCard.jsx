import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeItem, increaseQty, decreaseQty } from '../redux/cartSlice';

function CartCard({ name, id, price, image, qty }) {
  const dispatch = useDispatch();

  return (
    <div className='w-full p-3 rounded-lg shadow-md bg-white'>
      <div className='flex items-center gap-4'>
        {/* Image */}
        <div className='w-[100px] h-[100px] overflow-hidden rounded-md'>
          <img src={image} alt={name} className='w-full h-full object-cover' />
        </div>

        {/* Info */}
        <div className='flex justify-between items-center w-full'>
          {/* Name + Quantity */}
          <div className='flex flex-col gap-2'>
            <div className='text-lg font-semibold'>{name}</div>
            <div className='w-[110px] h-[40px] flex rounded-md shadow border'>
              <button onClick={() => dispatch(decreaseQty(id))} className='w-[30%] bg-gray-200 hover:bg-gray-300'>-</button>
              <span className='w-[40%] flex items-center justify-center'>{qty}</span>
              <button onClick={() => dispatch(increaseQty(id))} className='w-[30%] bg-gray-200 hover:bg-gray-300'>+</button>
            </div>
          </div>

          {/* Price + Delete */}
          <div className='flex flex-col items-end gap-2'>
            <span className='text-base font-medium text-green-600'>₹{price * qty}</span>
            <button
              onClick={() => dispatch(removeItem(id))}
              className='text-red-500 hover:text-red-700 text-xl'
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;