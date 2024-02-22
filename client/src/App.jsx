/* eslint-disable react-refresh/only-export-components */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Register,
  Login,
  SharedLayout,
  Error,
  Landing,
  Chat,
} from "./pages";

import { action as loginAction } from "./pages/Login";
import { loader as SharedLayoutLoader } from "./pages/SharedLayout";
import { action as registerAction } from "./pages/Register";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },

      {
        path: "",
        element: <SharedLayout queryClient={queryClient} />,
        loader: SharedLayoutLoader(queryClient),
        children: [
          {
            index: true,
            element: <Chat />,
            // action: addJobAction(queryClient),
          },
          {
            path: "chatbot",
            element: <Chat />,
            // action: loginAction(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
