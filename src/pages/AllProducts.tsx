/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../redux/features/product/productApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import DetailsModal from "../components/Modal/DetailsModal";
import SaleModal from "../components/Modal/SaleModal";
import UpdateModal from "../components/Modal/UpdateModal";
import DuplicateModal from "../components/Modal/DuplicateModal";

function AllProducts() {
  const [modelData, setModelData] = useState();

  const [deleteProduct, { error }] = useDeleteProductMutation();
  const [filterOptions, setFilterOptions] = useState({
    priceRange: { min: 0, max: 1000 },
    releaseDate: "",
    brand: "",
    modelNumber: "",
    category: "",
    operatingSystem: "",
    connectivity: "",
    powerSource: "",
    features: "",
    weight: "",
  });
  console.log(filterOptions);

  // Function to update filter options
  const handleFilterChange = (key, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };
  const serializeFilterOptions = (options) => {
    const params = new URLSearchParams();
    for (const key in options) {
      if (
        options[key] !== "" &&
        options[key] !== null &&
        options[key] !== undefined
      ) {
        if (typeof options[key] === "object") {
          // Handle nested objects, e.g., priceRange
          for (const nestedKey in options[key]) {
            params.append(`${key}[${nestedKey}]`, options[key][nestedKey]);
          }
        } else {
          params.append(key, options[key]);
        }
      }
    }
    return params.toString();
  };
  const queryParams = serializeFilterOptions(filterOptions);
  const { data, isLoading, isError } = useGetProductQuery(queryParams);

  const productData = data?.data;
  console.log({ isError }, { error });
  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <section className="bg-green-100  m-3 rounded-lg border ">
        {/* Filter components */}
        <div className="grid grid-cols-2 gap-4 my-4 p-3">
          <label>
            Price Range:
            <input
              type="number"
              className="ml-2 input input-bordered input-sm w-40 max-w-xs"
              value={filterOptions.priceRange.min}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filterOptions.priceRange,
                  min: Number(e.target.value),
                })
              }
              placeholder="Min"
            />{" "}
            <span>to</span>
            <input
              type="number"
              className="ml-2 input input-bordered input-sm w-40 max-w-xs"
              value={filterOptions.priceRange.max}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filterOptions.priceRange,
                  max: Number(e.target.value),
                })
              }
              placeholder="Max"
            />
          </label>
          <label>
            Release Date:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.releaseDate}
              onChange={(e) =>
                handleFilterChange("releaseDate", e.target.value)
              }
              placeholder="YYYY-MM-DD"
            />
          </label>
          <label>
            Brand:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              placeholder="Brand Name"
            />
          </label>
          <label>
            Model Name:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.modelNumber}
              onChange={(e) =>
                handleFilterChange("modelNumber", e.target.value)
              }
              placeholder="Model Name"
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              placeholder="Category"
            />
          </label>
          <label>
            Operating System:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.operatingSystem}
              onChange={(e) =>
                handleFilterChange("operatingSystem", e.target.value)
              }
              placeholder="Operating System"
            />
          </label>
          <label>
            Connectivity:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.connectivity}
              onChange={(e) =>
                handleFilterChange("connectivity", e.target.value)
              }
              placeholder="Connectivity"
            />
          </label>
          <label>
            Power Source:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.powerSource}
              onChange={(e) =>
                handleFilterChange("powerSource", e.target.value)
              }
              placeholder="Power Source"
            />
          </label>
          <label>
            Features:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.features}
              onChange={(e) => handleFilterChange("features", e.target.value)}
              placeholder="Features"
            />
          </label>
          <label>
            Weight:
            <input
              type="text"
              className="ml-2 input input-bordered input-sm w-full max-w-xs"
              value={filterOptions.weight}
              onChange={(e) => handleFilterChange("weight", e.target.value)}
              placeholder="Weight"
            />
          </label>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-8">
        {productData?.map((p: any) => (
          <div
            className="border rounded-lg hover:border-orange-300  p-3"
            key={p._id}
          >
            <div className="dropdown dropdown-bottom flex justify-end">
              <div tabIndex={0} role="button" className="pl-3">
                <BsThreeDotsVertical />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-orange-100 rounded-box w-52"
              >
                <li>
                  <label
                    onClick={() => setModelData(p)}
                    htmlFor="updated-modal"
                  >
                    Edit product
                  </label>
                </li>
                <li>
                  <label
                    onClick={() => setModelData(p)}
                    htmlFor="Duplicate-modal"
                  >
                    Create Variant
                  </label>
                </li>
                <li>
                  <label onClick={() => deleteProduct(p._id)}>
                    Delete product
                  </label>
                </li>
              </ul>
            </div>
            <div className=" grid grid-cols-2 ">
              <img className="size-40" src={p.img} alt={p.name} />
              <div>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-2xl">
                  price: <span className="font-bold"> {p.price}</span> $
                </p>
                <p className="text-lg">
                  Brand:<span className="font-bold"> {p.brand}</span>
                </p>
                <p className="text-lg">
                  Model:<span className="font-bold"> {p.modelNumber}</span>
                </p>
                <p className="text-lg">
                  Features:<span className="font-bold"> {p.features}</span>
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-evenly">
              <label
                onClick={() => setModelData(p)}
                htmlFor="booking-modal"
                className="btn btn-outline btn-sm btn-primary px-8 text-xl font-bold rounded-full"
              >
                Buy Now
              </label>
              <label
                onClick={() => setModelData(p)}
                htmlFor="details-modal"
                className="btn btn-outline btn-sm btn-primary px-8 text-xl font-bold rounded-full"
              >
                Details
              </label>
            </div>
          </div>
        ))}
        <SaleModal modelData={modelData} />
        <DetailsModal modelData={modelData} />
        <UpdateModal modelData={modelData} />
        <DuplicateModal modelData={modelData} />
      </div>
    </div>
  );
}

export default AllProducts;
