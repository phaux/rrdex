/// <reference types="react/canary" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { AppSidebar } from "./AppSidebar";
import { BoardPage } from "./BoardPage";
import { CreateBoardPage } from "./CreateBoardPage";
import { ErrorPage } from "./ErrorPage";

const remountOnParamsChange = <T extends object>(
  Component: React.ComponentType<T>,
  keys: readonly string[],
) => {
  return function RemountOnParamsChange(props: T) {
    const params = useParams();
    const entries = Object.entries(params)
      .filter(([key]) => keys.includes(key))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, value]) => value ?? "");
    return <Component key={entries.join("-")} {...props} />;
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: CreateBoardPage,
      },
      {
        path: "boards/:boardId",
        Component: remountOnParamsChange(BoardPage, ["boardId"]),
      },
    ],
  },
]);

function AppLayout() {
  return (
    <div className="flex h-screen accent-blue-600">
      <AppSidebar />
      <Outlet />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
