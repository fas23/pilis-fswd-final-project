import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  setCart: () => {}
})

export const CartProvider = ({ children }) => {
  const[cart, setCart]=useState([])
  const value = { cart, setCart};
  console.log("peliculas del carrito",cart) ;
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}