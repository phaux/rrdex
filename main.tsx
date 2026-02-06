/// <reference types="react/canary" />
import { StrictMode, ViewTransition } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { BoardPage } from "./BoardPage";
import { CreateBoardPage } from "./CreateBoardPage";
import { ErrorPage } from "./ErrorPage";

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
        Component: BoardPage,
      },
    ],
  },
]);

function AppLayout() {
  return (
    <div className="flex h-screen accent-blue-600">
      <AppSidebar />
      <ViewTransition>
        <Outlet />
      </ViewTransition>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
