import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/AdminFooter';
import PageWrapper from '../components/Wrapper/PageWrapper';

function AdminLayout() {
  return (
    <>
      <Sidebar />
      <main className="md:ml-64 h-full">
        <Navbar />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
        <Footer />
      </main>
    </>
  );
}

export default AdminLayout;
