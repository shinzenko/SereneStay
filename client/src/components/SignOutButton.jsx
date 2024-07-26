import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); // makes the validate query to run again which makes sure if the token  is invalid and updates accordingly
      showToast({ message: "Signed Out", type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 font-bold bg-white hover:bg-gray-100 px-3"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
