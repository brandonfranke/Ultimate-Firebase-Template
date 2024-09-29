import Four0Four from "@features/error/404";
import AppError from "@features/error/AppError";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Four0Four />;
  }

  return <AppError error={error} />;
}
