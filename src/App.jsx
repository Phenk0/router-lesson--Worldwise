import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import CityList from './components/CityList.jsx';

function App() {
  const router = createBrowserRouter([
    { path: '/', Component: Homepage },
    { path: 'product', Component: Product },
    { path: 'pricing', Component: Pricing },
    { path: 'login', Component: Login },
    {
      path: 'app',
      Component: AppLayout,
      children: [
        { index: true, element: <p>LIST</p> },
        { path: 'cities', index: true, Component: CityList },
        { path: 'countries', element: <p>List of countries</p> },
        { path: 'form', element: <p>Form</p> },
      ],
    },
    { path: '*', Component: PageNotFound },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
