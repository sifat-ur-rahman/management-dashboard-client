import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import SalesHistory from "../pages/SalesHistory";
import AllProducts from "../pages/AllProducts";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import BulkDelete from "../pages/BulkDelete";
import AddedProducts from "../pages/AddedProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AllProducts />,
      },
      {
        path: "added",
        element: <AddedProducts />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
      {
        path: "bulk-delete",
        element: <BulkDelete />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
