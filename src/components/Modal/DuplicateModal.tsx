import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDuplicateProductMutation } from "../../redux/features/product/productApi";

function DuplicateModal({ modelData }) {
  const [duplicateProduct, { error }] = useDuplicateProductMutation();
  console.log(error);
  interface IFormData {
    name: string;
    img: string;
    price: number;
    quantity: number;
    releaseDate: string;
    brand: string;
    modelNumber: string;
    category: string;
    operatingSystem: string;
    connectivity: string;
    powerSource: string;
    features: string;
    weight: number;
    length: string;
    width: number;
    height: number;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormData>();

  const handDuplicateProduct = async (data: IFormData) => {
    const updatedData = {
      id: modelData?._id,
      productData: {
        name: data.name,
        img: modelData?.img,
        price: +data.price,
        quantity: +data.quantity,
        releaseDate: data.releaseDate,
        brand: data.brand,
        modelNumber: data.modelNumber,
        category: data.category,
        operatingSystem: data.operatingSystem,
        connectivity: data.connectivity,
        powerSource: data.powerSource,
        features: data.features,
        weight: +data.weight,
        dimensions: {
          length: +data.length,
          width: +data.width,
          height: +data.height,
        },
      },
    };

    console.log(updatedData);
    await duplicateProduct(updatedData);
    reset();
    toast.success("Product updated successfully");
  };
  return (
    <>
      <input type="checkbox" id="Duplicate-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="Duplicate-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleSubmit(handDuplicateProduct)} method="dialog">
            <section className="grid grid-cols-1 lg:grid-cols-2  lg:gap-9">
              <div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    defaultValue={modelData?.name}
                    {...register("name")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name?.message}</p>
                  )}
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product Price</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={modelData?.price}
                    placeholder="Product Price"
                    {...register("price")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.price && (
                    <p className="text-red-600">{errors.price?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product Quantity</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={modelData?.quantity}
                    placeholder="Product Quantity"
                    {...register("quantity")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.quantity && (
                    <p className="text-red-600">{errors.quantity?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Release Date</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Release Date"
                    defaultValue={modelData?.releaseDate}
                    {...register("releaseDate")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.releaseDate && (
                    <p className="text-red-600">
                      {errors.releaseDate?.message}
                    </p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product brand</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product brand"
                    defaultValue={modelData?.brand}
                    {...register("brand")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.brand && (
                    <p className="text-red-600">{errors.brand?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Model Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Model Number"
                    defaultValue={modelData?.modelNumber}
                    {...register("modelNumber")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.modelNumber && (
                    <p className="text-red-600">
                      {errors.modelNumber?.message}
                    </p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product category</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product category"
                    defaultValue={modelData?.category}
                    {...register("category")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.category && (
                    <p className="text-red-600">{errors.category?.message}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Operating System</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Operating System"
                    defaultValue={modelData?.operatingSystem}
                    {...register("operatingSystem")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.operatingSystem && (
                    <p className="text-red-600">
                      {errors.operatingSystem?.message}
                    </p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Connectivity</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Connectivity"
                    defaultValue={modelData?.connectivity}
                    {...register("connectivity")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.connectivity && (
                    <p className="text-red-600">
                      {errors.connectivity?.message}
                    </p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">power Source</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Power Source"
                    defaultValue={modelData?.powerSource}
                    {...register("powerSource")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.powerSource && (
                    <p className="text-red-600">
                      {errors.powerSource?.message}
                    </p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Features</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Features"
                    defaultValue={modelData?.features}
                    {...register("features")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.features && (
                    <p className="text-red-600">{errors.features?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product weight</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Product weight"
                    defaultValue={modelData?.weight}
                    {...register("weight")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.weight && (
                    <p className="text-red-600">{errors.weight?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product length</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Product length"
                    defaultValue={modelData?.dimensions?.length}
                    {...register("length")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.length && (
                    <p className="text-red-600">{errors.length?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product width</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Product width"
                    defaultValue={modelData?.dimensions?.width}
                    {...register("width")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.width && (
                    <p className="text-red-600">{errors.width?.message}</p>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Product Height</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={modelData?.dimensions?.height}
                    placeholder="Product Height"
                    {...register("height")}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.height && (
                    <p className="text-red-600">{errors.height?.message}</p>
                  )}
                </div>
              </div>
            </section>
            <div className="flex justify-end items-center">
              <input
                className="btn btn-accent  text-xl w-72  mt-5"
                value="Create Variant"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DuplicateModal;
