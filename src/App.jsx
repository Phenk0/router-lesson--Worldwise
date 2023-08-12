import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Homepage
    },
    {
      path: 'product',
      Component: Product
    },
    {
      path: 'pricing',
      Component: Pricing
    },
    {
      path: 'login',
      Component: Login
    },
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
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
