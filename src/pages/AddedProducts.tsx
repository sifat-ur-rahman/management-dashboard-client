/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductByUserQuery,
} from "../redux/features/product/productApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import DetailsModal from "../components/Modal/DetailsModal";
import SaleModal from "../components/Modal/SaleModal";
import UpdateModal from "../components/Modal/UpdateModal";
import DuplicateModal from "../components/Modal/DuplicateModal";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAddAddToCardMutation } from "../redux/features/addToCard/addToCardApi";
import toast from "react-hot-toast";

function AddedProducts() {
  const [modelData, setModelData] = useState<any | null>(null);
  const [productId, setProductId] = useState<any | null>(null);

  const user: any = useAppSelector(useCurrentUser);
  const [deleteProduct, { error }] = useDeleteProductMutation();
  const [addToCartDisabled, setAddToCartDisabled] = useState<
    Record<string, boolean>
  >({});
  const { data, isLoading, isError } = useGetProductByUserQuery(user?.userId);
  const [addAddToCard] = useAddAddToCardMutation();
  const productData = data?.data;
  console.log({ isError }, { error });

  useEffect(() => {
    const storedDisabledStatus = localStorage.getItem("addToCartDisabled");
    if (storedDisabledStatus) {
      setAddToCartDisabled(JSON.parse(storedDisabledStatus));
    }
  }, []);

  const handleAddToCart = async (cardData: any) => {
    const addToCardData = {
      productPrice: cardData.price,
      productImg: cardData.img,
      buyerName: user?.name,
      buyerId: user?.userId,
      productId: cardData._id,
    };

    const result: any = await addAddToCard(addToCardData);
    console.log(result);
    if (result.data.success) {
      // Update disabled status in local storage
      const updatedDisabledStatus = {
        ...addToCartDisabled,
        [cardData._id]: true,
      };
      localStorage.setItem(
        "addToCartDisabled",
        JSON.stringify(updatedDisabledStatus)
      );
      setAddToCartDisabled(updatedDisabledStatus);
      toast.success(`${result.data.message}`);
    }
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
                    onClick={() => setProductId(p._id)}
                    htmlFor="updated-modal"
                  >
                    Edit product
                  </label>
                </li>
                <li>
                  <label
                    onClick={() => setProductId(p._id)}
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
              <button
                onClick={() => handleAddToCart(p)}
                disabled={addToCartDisabled[p._id]}
                className="btn btn-outline btn-sm btn-primary px-8 text-xl font-bold rounded-full"
              >
                {addToCartDisabled[p._id] ? "Added to Cart" : "Add to Cart"}
              </button>
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
        <UpdateModal productId={productId} />
        <DuplicateModal productId={productId} />
      </div>
    </div>
  );
}

export default AddedProducts;
