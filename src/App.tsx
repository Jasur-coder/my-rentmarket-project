import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LikesProvider } from "./context/LikesContext";
import { CardsProvider } from "./context/CardsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Apply = lazy(() => import("./pages/Apply"));
const Business = lazy(() => import("./pages/Business"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ToOrder = lazy(() => import("./components/ToOrder"));
const MyProfile = lazy(() => import("./components/MyProfile"));

const queryClient = new QueryClient();


function App() {
 const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/catalog",
          element: (
            <Suspense fallback={<Loading />}>
              <Catalog />
            </Suspense>
          ),
        },
        {
          path: "/howtoapply",
          element: (
            <Suspense fallback={<Loading />}>
              <Apply />
            </Suspense>
          ),
        },
        {
          path: "/forbusiness",
          element: (
            <Suspense fallback={<Loading />}>
              <Business />
            </Suspense>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Suspense fallback={<Loading />}>
              <ToOrder />
            </Suspense>
          ),
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={<Loading />}>
              <MyProfile />
            </Suspense>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <Apply />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
    <LikesProvider>
        <CardsProvider>
          <RouterProvider router={routes} />
          <Toaster richColors position="top-right" />
        </CardsProvider>
      </LikesProvider>
    </QueryClientProvider>
  );
}

export default App