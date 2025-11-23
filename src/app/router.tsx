import { createBrowserRouter } from "react-router-dom";
import { IndexRoute } from "./routes";
import { ProductRoute } from "./routes/product";
import { AppErrorPage } from "../shared/components/AppErrorPage";

export const router = createBrowserRouter([
  { path: "/", element: <IndexRoute />, errorElement: <AppErrorPage /> },
  { path: "/product/:id", element: <ProductRoute />, errorElement: <AppErrorPage /> },
  { path: "*", element: <AppErrorPage /> },
]);
