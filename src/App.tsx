import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Catalog from "./pages/Catalog";
import Apply from "./pages/Apply";
import Company from "./pages/Company";
import Business from "./pages/Business";
import { LikesProvider } from "./context/LikesContext";
import { CardsProvider } from "./context/CardsContext";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const queryClient = new QueryClient();
 const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/catalog",
          element: <Catalog />,
        },
        {
          path: "/howtoapply",
          element: <Apply />,
        },
        {
          path: "/aboutthecompany",
          element: <Company />,
        },
        {
          path: "/forbusiness",
          element: <Business />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/product/:id",
          element: <Apply />,
        }
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
    <LikesProvider>
        <CardsProvider>
          <RouterProvider router={routes} />
        </CardsProvider>
      </LikesProvider>
    </QueryClientProvider>
  );
}

export default App