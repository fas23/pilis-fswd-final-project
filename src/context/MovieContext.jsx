import { createContext, useState } from "react";

export const MovieContext = createContext({
  listings: [],
  setListings: () => {}
})

export const MovieProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const value = { listings, setListings};
  /* console.log(listings) */
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}