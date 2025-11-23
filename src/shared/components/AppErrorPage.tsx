import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const AppErrorPage = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
    ? error.message
    : "Something unexpected happened.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f9fb] px-4 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Oops!</h1>
      <p className="text-sm text-gray-600">{message}</p>
      <a
        href="/"
        className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
      >
        Back to home
      </a>
    </div>
  );
};
