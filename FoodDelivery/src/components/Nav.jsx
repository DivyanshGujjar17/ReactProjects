import React, { useEffect } from 'react';
import { IoFastFoodSharp, IoSearch } from 'react-icons/io5';

import { LuShoppingBag } from 'react-icons/lu';
import { dataContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { food_items } from '../Food';
import { useSelector } from 'react-redux';
function Nav() {
  const{input,setinput,categ,setcateg,cart,setcart}=useContext(dataContext);
  useEffect(()=>{
const newlist=food_items.filter((item)=>item.food_name.includes(input)||item.food_name.toLowerCase().includes(input))
setcateg(newlist)
  },[input]);
  const item=useSelector(state=>state.cart);
  console.log(item);
  
  return (
    <div className="w-full bg-slate-200 flex items-center justify-between p-5 ">
      <div className="w-[60px] h-[60px] hover:border-2 border-green-500 bg-white flex justify-center items-center rounded-full shadow-md cursor-pointer">
        <IoFastFoodSharp className="h-[30px] w-[30px] text-green-500" />
      </div>

      <form onSubmit={(e)=>e.preventDefault()}
      className="w-[50%] h-[40px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md ">
        <IoSearch className="text-green-600 h-[20px] w-[20px]" />
        <input
          type="text"
          onChange={(e)=>setinput(e.target.value)}
          value={input}
          placeholder="Search For Items"
          className="w-full outline-none text-[16px] md:text-[20px]"
        />
      </form>

      <div onClick={()=>setcart(true)} className="w-[60px] h-[60px] flex bg-white justify-center items-center rounded-full hover:border-2 border-green-500 shadow-md cursor-pointer relative">
        <span className="absolute top-0 right-2 text-green-500 font-bold text-[18px]">{item.length}</span>
        <LuShoppingBag  className="h-[30px] w-[30px] text-green-500" />
      </div>
    </div>
  );
}

export default Nav;