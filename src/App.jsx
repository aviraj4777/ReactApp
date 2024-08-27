import React, { lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import userContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

// const About = lazy(() => import("./components/About.jsx"));

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    // Make an API call to get userInfo;
    const data = {
      name: "abc",
    };
    setUserName(data.name);
  }, []);
  return (
      <Provider store={appStore}>
      <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
      </userContext.Provider>
      </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(<RouterProvider router={appRouter} />);
