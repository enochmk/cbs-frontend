import { IRoute } from './interfaces/IRoute';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AdjustAccount from './pages/AdjustAccount';
import DeleteBlacklist from './pages/DeleteBlacklist';
import FirstRequest from './pages/FirstRequest';
import ReconnectRequest from './pages/ReconnectRequest';
import SubscribeProduct from './pages/SubscribeProduct';
import UnsubscribeProduct from './pages/UnsubscribeProduct';
import NumberCreation from './pages/NumberCreation';

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
  {
    name: 'Adjust Account',
    layout: 'admin',
    path: 'adjust-account',
    element: <AdjustAccount />,
  },
  {
    name: 'Delete Blacklist',
    layout: 'admin',
    path: 'delete-blacklist',
    element: <DeleteBlacklist />,
  },
  {
    name: 'First Request',
    layout: 'admin',
    path: 'first-request',
    element: <FirstRequest />,
  },
  {
    name: 'Reconnect Request',
    layout: 'admin',
    path: 'reconnect-request',
    element: <ReconnectRequest />,
  },
  {
    name: 'Subscribe Product',
    layout: 'admin',
    path: 'subscribe-product',
    element: <SubscribeProduct />,
  },
  {
    name: 'Unsubscribe Product',
    layout: 'admin',
    path: 'unsubscribe-product',
    element: <UnsubscribeProduct />,
  },
  {
    name: 'Number Creation',
    layout: 'admin',
    path: 'number-creation',
    element: <NumberCreation />,
  },
];

export default routes;
