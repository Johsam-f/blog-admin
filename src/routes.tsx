import Signup from "./pages/auth/signup";
import ErrorPage from "./pages/errorPage";
import AdminDashboard from "./pages/dashboard";
import Login from "./pages/auth/login";

const routes = [
    {
      path: "/",
      element: <AdminDashboard />,
      errorElement: <ErrorPage/>
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]

export default routes;