import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StyleCalculator from '../StyleCalculator'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const About = () => {
  return (
    <div>
      <h1>This is an about page</h1>
    </div>
  );
};

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <div>
      <StyleCalculator/>
    </div>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "app",
    element: <App />,
  },
  {
    path: "app/about",
    element: <About />,
  },
]);

const AppWithRouter = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default AppWithRouter;
