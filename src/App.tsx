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



function App() {

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
      ],
    },
  ]);

  return (
    <LikesProvider>
      <CardsProvider>
        <RouterProvider router={routes} />
      </CardsProvider>
    </LikesProvider>
  );
}

export default App