import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";

const AdminLayout = () => {
  const mainContent = useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return <Route key={key} path={prop.layout + prop.path} element={prop.element} />;
      } else {
        return null;
      }
    });
  };

  return (
    <div className="wrapper">
      <Sidebar routes={routes} />
      <main className="main-content" ref={mainContent}>
        <AdminNavbar />
        <section className="content">
          <Routes>{getRoutes(routes)}</Routes>
        </section>
        <footer className="container-fluid">
          <AdminFooter />
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
