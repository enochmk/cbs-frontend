import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar/AdminNavbar';
import Footer from '../components/Footer/AuthFooter';

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

AdminLayout.propTypes = {};

export default AdminLayout;
