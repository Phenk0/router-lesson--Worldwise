import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';

const BASE_URL = 'http://localhost:8000/';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok)
          throw new Error('Some unknown error in fetching cities');
        const data = await response.json();
        setCities(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const router = createBrowserRouter([
    { path: '/', Component: Homepage },
    {
      path: 'product',
      Component: Product
    },
    { path: 'pricing', Component: Pricing },
    { path: 'login', Component: Login },
    {
      path: 'app',
      Component: AppLayout,
      children: [
        { index: true, element: <p>LIST</p> },
        {
          path: 'cities',
          element: <CityList cities={cities} isLoading={isLoading} />,
          children: [{ path: ':id', element: <City /> }]
        },
        {
          path: 'countries',
          element: <CountryList isLoading={isLoading} cities={cities} />
        },
        { path: 'form', element: <p>Form</p> }
      ]
    },
    { path: '*', Component: PageNotFound }
  ]);

  console.log(isLoading, cities);
  return <RouterProvider router={router} />;
}

export default App;
