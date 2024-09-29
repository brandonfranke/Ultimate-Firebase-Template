import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useTheme } from "@hooks/utils";
import { useAuthUser } from "@hooks/firebase/auth";
import { auth } from "@config/firebase";
import { lazy, Suspense } from "react";
import Error from "@features/error/Error";
import CookieConsent from "@components/CookieConsent";
import {
  MustBeSignedInRoute,
  MustBeSignedOutRoute,
} from "@components/helpers/ProtectedRoutes";

const Homepage = lazy(() => import("@features/homepage/Homepage"));
const Dashboard = lazy(() => import("@features/dashboard/Dashboard"));
const SignIn = lazy(() => import("@features/auth/SignIn/SignIn"));
const ForgotPassword = lazy(
  () => import("@features/auth/ForgotPassword/ForgotPassword"),
);
const ResetPassword = lazy(
  () => import("@features/auth/ResetPassword/ResetPassword"),
);
const Orders = lazy(() => import("@features/dashboard/orders/Orders"));
const Settings = lazy(() => import("@features/dashboard/settings/Settings"));
const Register = lazy(() => import("@features/auth/Register/Register"));
const AdditionalRegistrationInfo = lazy(
  () =>
    import("@features/auth/AdditionalRegistrationInfo/AdditionalRegistration"),
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" errorElement={<Error />}>
        <Route index={true} element={<Homepage />} />
        <Route
          path="dashboard"
          element={
            <MustBeSignedInRoute>
              <Dashboard />
            </MustBeSignedInRoute>
          }
        >
          <Route index element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route
          path="signin"
          element={
            <MustBeSignedOutRoute>
              <Outlet />
            </MustBeSignedOutRoute>
          }
        >
          <Route index element={<SignIn />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="register">
          <Route
            index
            element={
              <MustBeSignedOutRoute>
                <Register />
              </MustBeSignedOutRoute>
            }
          />
          <Route
            path="additional"
            element={
              <MustBeSignedInRoute>
                <AdditionalRegistrationInfo />
              </MustBeSignedInRoute>
            }
          />
        </Route>
      </Route>
    </>,
  ),
);
export default function App() {
  //set the theme on app load
  useTheme();
  //register an onAuthChanged listener on app load
  useAuthUser(auth);

  return (
    <Suspense fallback={<>Loading..</>}>
      <RouterProvider router={router} />
      <CookieConsent />
    </Suspense>
  );
}
