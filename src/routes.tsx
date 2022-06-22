import { IRoute } from './interfaces/IRoute';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const routes: IRoute[] = [
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
