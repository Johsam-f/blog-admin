import Signup from "./pages/auth/signup";
import ErrorPage from "./pages/errorPage";
import Dashboard from "./pages/dashboard";

const routes = [
    {
      path: "/",
      element: <Signup />,
      errorElement: <ErrorPage/>
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]

export default routes;