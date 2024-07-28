import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const { hotelId } = useParams();
  const search = useSearchContext();
  const [numberOfNights, setNumberOfNight] = useState(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const diffInDays =
        Math.abs(
          new Date(search.checkOut.getTime()) -
            new Date(search.checkIn.getTime())
        ) /
        (1000 * 60 * 60 * 24);
      setNumberOfNight(Math.ceil(diffInDays));
    }
  }, [search.checkIn, search.checkOut]);
  const { data: hotel } = useQuery("fetchHotelById", () =>
    apiClient.fetchHotelById(hotelId)
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  console.log(hotel, "hotel hai");
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
