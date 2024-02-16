/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useAddSaleMutation } from "../../redux/features/sales/saleApi";

function SaleModal({ modelData }: any) {
  const user: any = useAppSelector(useCurrentUser);
  const [addSale, { error }] = useAddSaleMutation();
  console.log(error);
  interface IFormValues {
    quantity: string;
    date: string;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormValues>();

  const handSale = async (data: { quantity: string | number; date: any }) => {
    const saleData = {
      quantity: +data.quantity,
      buyerName: user?.name,
      saleDate: data.date,
      productId: modelData?._id,
    };
    console.log(saleData);
    await addSale(saleData);
    reset();
    toast.success("Buy successfully");
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg ">
            Product name: <span className="font-bold">{modelData?.name}</span>{" "}
          </h3>
          <h3 className="text-lg my-2">
            Product price: <span className="font-bold">{modelData?.price}</span>{" "}
          </h3>
          <form onSubmit={handleSubmit(handSale)} method="dialog">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product quantity</span>
              </label>
              <input
                type="number"
                placeholder="Product quantity"
                {...register("quantity", {
                  required: "Product quantity is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.quantity && (
                <p className="text-red-600">{errors.quantity?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Buy Date</span>
              </label>
              <input
                type="date"
                {...register("date", {
                  required: "Buy date is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.date && (
                <p className="text-red-600">{errors.date?.message}</p>
              )}
            </div>

            <input
              className="btn btn-accent btn-outline mt-5 px-16 text-xl font-bold rounded-full w-72 "
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SaleModal;
