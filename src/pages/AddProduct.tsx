import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProductMutation } from "../redux/features/product/productApi";

function AddProduct() {
  interface IFormData {
    name: string;
    img: FileList;
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
  const [addProduct, { error }] = useAddProductMutation();
  console.log({ error });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormData>();

  const handleAddProduct = async (data: IFormData) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=a135457f4ca9a16c458962a3ed75df96`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgData) => {
        if (imgData.success) {
          //product data
          const product = {
            name: data.name,
            img: imgData.data.url,
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
          };
          console.log({ product });
          addProduct(product);

          toast.success("Product added successfully");
          reset();
        }
      });
  };
  return (
    <div className="  flex justify-center items-center">
      <div className="w-full p-7 grid items-center justify-items-center">
        <h2 className="text-4xl mb-4 text-center font-bold"> Add A Product </h2>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <section className="grid grid-cols-1 lg:grid-cols-2  lg:gap-9">
            <div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  {...register("name", {
                    required: "Product Name is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Photo</span>
                </label>
                <input
                  type="file"
                  placeholder="Image"
                  {...register("img", {
                    required: "Product Photo is required",
                  })}
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                />
                {errors.img && (
                  <p className="text-red-600">{errors.img?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Product Price"
                  {...register("price", {
                    required: "Product Price is required",
                  })}
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
                  placeholder="Product Quantity"
                  {...register("quantity", {
                    required: "Product Quantity",
                  })}
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
                  type="date"
                  placeholder="Release Date"
                  {...register("releaseDate", {
                    required: "Release Date is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.releaseDate && (
                  <p className="text-red-600">{errors.releaseDate?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product brand</span>
                </label>
                <input
                  type="text"
                  placeholder="Product brand"
                  {...register("brand", { required: "brand is required" })}
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
                  {...register("modelNumber", {
                    required: "Model Number is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.modelNumber && (
                  <p className="text-red-600">{errors.modelNumber?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product category</span>
                </label>
                <input
                  type="text"
                  placeholder="Product category"
                  {...register("category", {
                    required: "Product category is required",
                  })}
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
                  {...register("operatingSystem", {
                    required: "Operating System  is required",
                  })}
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
                  {...register("connectivity", {
                    required: "Connectivity is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.connectivity && (
                  <p className="text-red-600">{errors.connectivity?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">power Source</span>
                </label>
                <input
                  type="text"
                  placeholder="Power Source"
                  {...register("powerSource", {
                    required: "powerSource is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.powerSource && (
                  <p className="text-red-600">{errors.powerSource?.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Features</span>
                </label>
                <input
                  type="text"
                  placeholder="Features"
                  {...register("features", {
                    required: "features is required",
                  })}
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
                  {...register("weight", { required: "weight is required" })}
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
                  {...register("length", { required: "Length is required" })}
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
                  {...register("width", { required: "Width is required" })}
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
                  placeholder="Product Height"
                  {...register("height", { required: "Height is required" })}
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
              value="Add Product"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
