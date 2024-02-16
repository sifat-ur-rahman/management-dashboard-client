import { Link, Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";

function MainLayout() {
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
            <li>
              <Link className="font-medium" to="/">
                All Products
              </Link>
            </li>
            <li>
              <Link className="font-medium" to="/added">
                Added Products
              </Link>
            </li>
            <li>
              <Link className="font-medium" to="/bulk-delete">
                Bulk Delete
              </Link>
            </li>
            <li>
              <Link className="font-medium" to="/add-product">
                Add A product
              </Link>
            </li>
            <li>
              <Link className="font-medium" to="/sales-history">
                Sales History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
