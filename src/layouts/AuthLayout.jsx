import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar/AuthNavbar';
import Footer from '../components/Footer/AuthFooter';

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

AuthLayout.propTypes = {};

export default AuthLayout;
