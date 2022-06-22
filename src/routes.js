import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const routes = [
  {
    name: 'Sign In',
    layout: 'auth',
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    name: 'Dashboard',
    layout: 'admin',
    path: 'dashboard',
    element: <Dashboard />,
  },
];

export default routes;
