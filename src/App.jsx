import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
	return (
		<BrowserRouter>
			<AdminLayout />
			<AuthLayout />
		</BrowserRouter>
	);
}

export default App;
