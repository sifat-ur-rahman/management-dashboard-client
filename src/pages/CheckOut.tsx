/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAddToCardByUserQuery } from "../redux/features/addToCard/addToCardApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import CheckOutCard from "../components/CheckOutCard/CheckOutCard";

function CheckOut() {
  const user: any = useAppSelector(useCurrentUser);

  const {
    data: addToCardData,
    isLoading,
    isError,
  } = useGetAddToCardByUserQuery(user?.userId);
  if (isLoading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      {addToCardData?.data?.map((SData: any) => (
        <CheckOutCard key={SData?._id} SData={SData} />
      ))}
    </div>
  );
}

export default CheckOut;
