/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useBulkDeleteProductMutation,
  useGetAllProductQuery,
} from "../redux/features/product/productApi";
import toast from "react-hot-toast";

function BulkDelete() {
  const { data, isLoading, isError } = useGetAllProductQuery(undefined);
  const productData = data?.data;

  const [bulkDeleteProduct, { error }] = useBulkDeleteProductMutation();
  console.log({ isError }, { error });
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const handleCheckboxChange = (productId: string) => {
    // Step 3: Update the selectedProductIds state based on checkbox changes
    setSelectedProductIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(productId)) {
        // If already selected, remove from the list
        return prevSelectedIds.filter((id) => id !== productId);
      } else {
        // If not selected, add to the list
        return [...prevSelectedIds, productId];
      }
    });
  };

  const handleDelete = async () => {
    await bulkDeleteProduct({ productsId: selectedProductIds });
    toast.success("Bulk Delete Product successfully");
  };
  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className=" flex justify-end">
        <button
          className="btn btn-outline self-end btn-primary px-8 text-xl font-bold rounded-full"
          onClick={handleDelete}
        >
          Delete selected product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
            </tr>
          </thead>
          {productData?.map((p: any) => (
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(p._id)}
                      checked={selectedProductIds.includes(p._id)}
                      className="checkbox"
                    />
                  </label>
                </th>
                <td className="font-bold">{p?.name}</td>
                <td>{p?.price}</td>
                <td>{p.brand}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default BulkDelete;
