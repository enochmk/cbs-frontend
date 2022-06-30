import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/admin/adjust-account" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
export default PublicRoute;
