import { createContext, useContext, useState } from "react";

const searchContext = createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState(
    () => sessionStorage.getItem("hotelId") || ""
  );
  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <searchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(searchContext);
  return context;
};
