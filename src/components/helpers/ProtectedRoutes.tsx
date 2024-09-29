import { ReactNode } from "react";
import { auth } from "@config/firebase";
import { useAuthUser } from "@hooks/firebase/auth";
import { Navigate, useLocation } from "react-router-dom";

export function MustBeSignedInRoute({
  children,
  redirectPath = "/signin",
}: {
  children: ReactNode;
  redirectPath?: string;
}) {
  const user = useAuthUser(auth);
  const location = useLocation();

  if (user.data) {
    return <>{children}</>;
  }
  return <Navigate to={redirectPath} replace state={{ from: location }} />;
}

export function MustBeSignedOutRoute({ children }: { children: ReactNode }) {
  const user = useAuthUser(auth);
  const location = useLocation();

  if (user.data) {
    return <Navigate to={location.state?.from ?? "/"} replace />;
  }
  return <>{children}</>;
}
