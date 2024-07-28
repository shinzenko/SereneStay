import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/starRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilters";
import FacilityFilter from "../components/FacilityFilter";
import PriceFilter from "../components/PriceFilter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const handleStarsChange = (event) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (event) => {
    const hotelTypes = event.target.value;
    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, hotelTypes]
        : prev.filter((type) => type !== hotelTypes)
    );
  };
  const handleFacilityFilter = (event) => {
    const facility = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((fac) => facility !== fac)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="borer border-slate-300 rounded-lg sticky h-fit p-5 top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilityFilter
            selectedFacility={selectedFacilities}
            onChange={handleFacilityFilter}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(val) => setSelectedPrice(val)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDec">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel, index) => (
          <SearchResultsCard key={index} hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
