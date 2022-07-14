import { IRoute } from './interfaces/IRoute';
import SignIn from './pages/SignIn';
import AdjustAccount from './pages/AdjustAccount';
import DeleteBlacklist from './pages/DeleteBlacklist';
import FirstRequest from './pages/FirstRequest';
import ChangeMainProduct from './pages/ChangeMainProduct';
// import ReconnectRequest from './pages/ReconnectRequest';
// import SubscribeProduct from './pages/SubscribeProduct';
// import UnsubscribeProduct from './pages/UnsubscribeProduct';
// import NumberCreation from './pages/NumberCreation';

const routes: IRoute[] = [
  {
    name: 'Sign In',
    layout: 'auth',
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    name: 'Adjust Account',
    layout: 'admin',
    path: 'adjust-account',
    icon: 'fas fa-tv mr-2 text-sm',
    element: <AdjustAccount />,
  },
  {
    name: 'First Activation',
    layout: 'admin',
    path: 'first-activation',
    element: <FirstRequest />,
  },
  {
    name: 'Change Main Product',
    layout: 'admin',
    path: 'change-main-product',
    icon: 'fas fa-tv mr-2 text-sm',
    element: <ChangeMainProduct />,
  },
  {
    name: 'Delete Blacklist',
    layout: 'admin',
    path: 'delete-blacklist',
    element: <DeleteBlacklist />,
  },

  // {
  //   name: 'Reconnect Request',
  //   layout: 'admin',
  //   path: 'reconnect-request',
  //   element: <ReconnectRequest />,
  // },
  // {
  //   name: 'Subscribe Product',
  //   layout: 'admin',
  //   path: 'subscribe-product',
  //   element: <SubscribeProduct />,
  // },
  // {
  //   name: 'Unsubscribe Product',
  //   layout: 'admin',
  //   path: 'unsubscribe-product',
  //   element: <UnsubscribeProduct />,
  // },
  // {
  //   name: 'Number Creation',
  //   layout: 'admin',
  //   path: 'number-creation',
  //   element: <NumberCreation />,
  // },
];

export default routes;
