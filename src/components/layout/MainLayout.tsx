/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

function MainLayout() {
  const token: string = useAppSelector(useCurrentToken);

  const user: any = verifyToken(token);
  return (
    <>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side lg:w-60 w-1/2 mt-10 lg:mt-0 ">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 lg:w-60 text-base-content">
            {user?.role === "Manager" ? (
              <>
                <li>
                  <Link className="font-medium" to="/all-products">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link className="font-medium" to="/add-product">
                    Add A product
                  </Link>
                </li>
                <li>
                  <Link className="font-medium" to="/bulk-delete">
                    Bulk Delete
                  </Link>
                </li>
                <li>
                  <Link className="font-medium" to="/sales-history">
                    Sales History
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="font-medium" to="/added-products">
                    Added Products
                  </Link>
                </li>

                <li>
                  <Link className="font-medium" to="/add-product">
                    Add A product
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
