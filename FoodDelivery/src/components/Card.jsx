import React from 'react';
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { additems } from '../redux/cartSlice';

function Card({ name, id, price, image, type }) {
  const dispatch = useDispatch();

  return (
    <div className="w-[280px] h-[360px] bg-white p-3 rounded-lg flex flex-col gap-4 shadow-lg hover:border-2 border-green-700">
      <div className="w-full h-[60%] overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt="food"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-[20px] font-semibold">{name}</div>
      <div className="w-full flex justify-between items-center px-2">
        <div className="font-semibold text-green-500 text-lg">{price}-/</div>
        <div className="font-semibold flex items-center justify-center gap-1">
          {type === 'veg' ? <LuLeafyGreen /> : <GiChickenOven />}
          <span>{type}</span>
        </div>
      </div>
      <button
        onClick={() =>
          dispatch(additems({ id, name, price, image }))
        }
        className="w-full rounded-lg bg-green-200 hover:bg-green-400 transition-all duration-200"
      >
        Add to Dish
      </button>
    </div>
  );
}

export default Card;