import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
export default ProtectedRoute;
