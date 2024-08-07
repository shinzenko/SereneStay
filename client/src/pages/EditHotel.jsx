import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery("fetchMyHotelById", () =>
    apiClient.fetchMyHotelById(hotelId || "")
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error updating hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
