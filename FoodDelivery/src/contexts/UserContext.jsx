import React, { createContext, useState, useSyncExternalStore } from 'react'
import { food_items } from '../Food';
 export const  dataContext=createContext();
function UserContext({children}) {
  const[cart,setcart]=useState(false);
 const[categ,setcateg]=useState(food_items);
    const[input,setinput]=useState('');
    const data={
input,
setinput,
categ,
setcateg,
cart,
setcart
    }
  return (
    <div>
      <dataContext.Provider  value={data}>
{children}
      </dataContext.Provider>
    </div>
  )
}

export default UserContext
