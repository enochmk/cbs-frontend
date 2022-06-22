import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import NotFound from './pages/NotFound';
import routes from './routes';

function App() {
  const getRoutes = (allRoutes, layout) => {
    return allRoutes.map((item, key) => {
      if (item.layout === layout)
        return <Route key={key} path={item.path} element={item.element} />;

      return null;
    });
  };

  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        {getRoutes(routes, 'auth')}
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        {getRoutes(routes, 'admin')}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
