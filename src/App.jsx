import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

function App() {
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
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="cities" replace /> },
        {
          path: 'cities',
          Component: CityList
        },
        { path: 'cities/:id', Component: City },
        {
          path: 'countries',
          Component: CountryList
        },
        { path: 'form', Component: Form }
      ]
    },
    { path: '*', Component: PageNotFound }
  ]);

  return (
    <AuthProvider>
      <CitiesProvider>
        <RouterProvider router={router} />
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
