import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';

function App() {
  const router = createBrowserRouter([
    { path: '/', Component: Homepage },
    { path: 'product', Component: Product },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
