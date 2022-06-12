import SignIn from './pages/SignIn';
import ChangeMainProduct from './pages/ChangeMainProduct';
import FirstActivation from './pages/FirstActivation';
import AdjustAccount from './pages/AdjustAccount';
import SubscribeProduct from './pages/SubscribeProduct';
import UnsubscribeProduct from './pages/UnsubscribeProduct';

const routes = [
	{
		name: 'Sign In',
		path: '/sign-in',
		layout: '/auth',
		element: <SignIn />,
	},
	{
		name: 'Change Main Product',
		path: '/change-main-product',
		layout: '/admin',
		element: <ChangeMainProduct />,
	},
	{
		name: 'First Activation',
		path: '/First-Activation',
		layout: '/admin',
		element: <FirstActivation />,
	},
	{
		name: 'Adjust Account',
		path: '/adjust-account',
		layout: '/admin',
		element: <AdjustAccount />,
	},
	{
		name: 'Subscribe Product',
		path: '/subscribe-product',
		layout: '/admin',
		element: <SubscribeProduct />,
	},
	{
		name: 'Unsubscribe Product',
		path: '/unsusbcribe-product',
		layout: '/admin',
		element: <UnsubscribeProduct />,
	},
];

export default routes;
