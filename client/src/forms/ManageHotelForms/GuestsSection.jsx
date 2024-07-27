import { useFormContext } from "react-hook-form";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="bg-gray-300 flex p-6 justify-evenly gap-5">
        <div className="flex flex-col min-w-[45%]">
          <label
            htmlFor="adults"
            className="text-gray-700 text-sm font-semibold"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            name="adults"
            min={1}
            {...register("adultCount", { required: "This is required Field" })}
            className="border rounded w-full py-1 px-3 font-normal"
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-[45%]">
          <label
            htmlFor="children"
            className="text-gray-700 text-sm font-semibold"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            name="children"
            min={0}
            {...register("childCount", { required: "This is required Field" })}
            className="border rounded w-full py-1 px-3 font-normal"
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
