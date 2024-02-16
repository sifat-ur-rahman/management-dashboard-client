import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAddSaleMutation } from "../../redux/features/sales/saleApi";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
function CheckOutCard({ SData }: any) {
  const [count, setCount] = useState(1);
  const user: any = useAppSelector(useCurrentUser);
  const [addSale, { error }] = useAddSaleMutation();
  const [isPurchased, setIsPurchased] = useState(false);
  console.log(error);
  useEffect(() => {
    // Check local storage if purchase has been made previously
    const purchased = localStorage.getItem("isPurchased");
    if (purchased) {
      setIsPurchased(true);
    }
  }, []);

  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const decreaseCount = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  const totalPrice = SData.productPrice * count;

  const handleSale = async () => {
    const saleData = {
      quantity: count,
      buyerName: user?.name,
      saleDate: new Date(),
      productId: SData?.productId,
      productPrice: totalPrice,
    };

    try {
      await addSale(saleData);
      toast.success("Buy successfully");
      setIsPurchased(true);
      // Store in local storage that purchase has been made
      localStorage.setItem("isPurchased", "true");
    } catch (error) {
      console.error("Error while making the purchase:", error);
    }
  };
  return (
    <div className=" border hover:border-orange-300 my-5 rounded-lg">
      <div className="flex items-center justify-around py-2">
        <img className="w-48 h-28" src={SData.productImg} alt="image" />
        <p className="text-xl font-bold">Price: {SData.productPrice}</p>
        <div className="flex flex-col items-center">
          <label className="text-lg mb-2">Product quantity </label>
          <div className="flex items-center">
            <button
              className="btn btn-sm text-2xl btn-outline btn-accent font-extrabold"
              onClick={increaseCount}
            >
              +
            </button>
            <p className="mx-3 text-3xl"> {count}</p>{" "}
            <button
              className="btn btn-sm btn-outline btn-secondary text-2xl font-extrabold"
              onClick={decreaseCount}
            >
              -
            </button>
          </div>
        </div>
        <p className="text-2xl">
          Total Price: <span className="font-bold"> {totalPrice}$</span>
        </p>
        <button
          onClick={handleSale}
          className="btn btn-outline btn-sm btn-primary px-4 text-xl font-bold rounded-full"
          disabled={isPurchased}
        >
          {isPurchased ? "Purchased" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default CheckOutCard;
