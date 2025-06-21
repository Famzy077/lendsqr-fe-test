import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './Pages/Auth/Login';
import Users from './Pages/Users/Users';
import UserDetails from './Pages/UserDetails/UserDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  { 
    path: '/dashboard',
    element: <App />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: 'user/:userId',
        element: <UserDetails />,
      },
    ],
  },
]);

export default router;