import { Routes, Route, Navigate } from 'react-router-dom';

import { IRoute } from './interfaces/IRoute';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import NotFound from './pages/NotFound';
import routes from './routes';
import ProtectedRoute from './components/Outlet/ProtectedRoute';
import PublicRoute from './components/Outlet/PublicRoute';
import PersistLogin from './components/Outlet/PersistLogin';

function App() {
  const getRoutes = (routes: IRoute[], layout: string) =>
    routes.map((item, key) => {
      if (item.layout === layout) {
        return <Route key={key} path={item.path} element={item.element} />;
      }
      return null;
    });

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<PublicRoute />}>
          <Route path="auth" element={<AuthLayout />}>
            {getRoutes(routes, 'auth')}
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            {getRoutes(routes, 'admin')}
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/admin/adjust-account" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
