import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const existingImageUrl = watch("imageUrls");

  const handleDelete = (e, imageUrl) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrl.filter((url) => {
        return url !== imageUrl;
      })
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrl && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrl.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrl?.length || 0);
              if (totalLength === 0)
                return "At least one image needs to be uploaded";
              else if (totalLength > 6) {
                return "You can't upload more than 6 images";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}{" "}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
