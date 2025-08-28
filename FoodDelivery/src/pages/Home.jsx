import React, { useContext } from 'react';
import Nav from '../components/Nav';
import Categories from '../categories';
import { food_items } from '../Food';
import Card from '../components/Card';
import { dataContext } from '../contexts/UserContext';
import { RxCross2 } from "react-icons/rx";
import CartCard from '../components/CartCard';
import { useSelector } from 'react-redux';

function Home() {
  const { categ, setcateg, input, cart, setcart } = useContext(dataContext);
  const cartItems = useSelector((state) => state.cart);

  function filter(category) {
    if (category === 'All') {
      setcateg(food_items);
    } else {
      const formatted = category.toLowerCase().replace(" ", "_");
      let newList = food_items.filter((item) => item.food_category === formatted);
      setcateg(newList);
    }
  }
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <Nav />
      <div className="w-full h-auto overflow-hidden bg-slate-200 flex flex-col">
        {!input && (
          <div className="w-full flex flex-wrap justify-center items-center gap-5 p-5 mt-4">
            {Categories.map((item) => (
              <div
                key={item.id}
                onClick={() => filter(item.name)}
                className="font-bold hover:border-2 border-green-500 w-[120px] h-[120px] bg-white hover:bg-green-300 flex flex-col items-center justify-center p-4 cursor-pointer rounded-lg shadow-xl transition-all duration-300"
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex flex-wrap justify-center items-center gap-5 p-5">
          {food_items.length > 0 ? (
            categ.map((item) => (
              <Card
                key={item.id}
                name={item.food_name}
                id={item.id}
                price={item.price}
                image={item.food_image}
                type={item.food_type}
              />
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-red-600">No food items found.</p>
          )}
        </div>

        {/* Cart Sidebar */}
        <div className={`w-[60vh] h-full bg-white fixed top-0 right-0 duration-500 ${cart ? "translate-x-0" : "translate-x-full"}`}>
          <header className='w-full flex justify-between items-center p-6 shadow-xl'>
            <span className='text-green-500 text-[18px] font-bold'>Order Items</span>
            <RxCross2 onClick={() => setcart(false)} className='w-[30px] h-[30px] text-green-500 cursor-pointer' />
          </header>

          {/* Scrollable Cart List */}
          <div className='p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-150px)]'>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  qty={item.qty}
                />
              ))
            ) : (
              <p className="text-center text-lg font-semibold text-gray-500">Cart is empty.</p>
            )}
          </div>

          {/* Total Price Section */}
          <div className='p-4 shadow-inner border-t text-lg font-semibold flex justify-between'>
            <span>Total:</span>
            <span className='text-green-600'>₹{total}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;