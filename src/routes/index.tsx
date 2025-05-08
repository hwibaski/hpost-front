import Home from '@/pages/HomePage';
import Login from '@/pages/LoginPage';
import QuickOrderList from '@/pages/QuickOrderListPage';
import QuickOrder from '@/pages/QuickOrderPage';
import Signup from '@/pages/SignupPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'quick-order',
        element: <QuickOrder />,
      },
      {
        path: 'quick-order-list',
        element: <QuickOrderList />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);
