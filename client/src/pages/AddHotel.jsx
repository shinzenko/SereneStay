import { useMutation } from "react-query";
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForms onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
