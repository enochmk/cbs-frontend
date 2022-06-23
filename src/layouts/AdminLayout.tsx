import { Outlet } from 'react-router-dom';

import AdminNavbar from '../components/Navbar/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/AdminFooter';
import PageWrapper from '../components/Wrapper/PageWrapper';
import HeaderStats from '../components/Wrapper/HeaderStats';

function AdminLayout() {
  return (
    <>
      <Sidebar title="AirtelTigo CBS" />
      <main className="md:ml-64 h-full">
        <AdminNavbar />
        <HeaderStats />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
        <Footer />
      </main>
    </>
  );
}

export default AdminLayout;
