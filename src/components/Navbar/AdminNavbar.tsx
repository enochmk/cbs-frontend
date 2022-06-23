import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.png';

function AdminNavbar() {
  return (

    <nav className="border-gray-200 px-2 py-2.5 bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <h2 className="flex items-center">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="AirtelTigo Logo" />
        </h2>
        <div className="flex items-center md:order-2">
          <button type="button" className="dropdown dropdown-end">
            <img tabIndex={0} src={avatar} className="mr-3 h-6 sm:h-9" alt="AirtelTigo Logo" />
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li className="disabled py-2">Admin</li>
              <div className="divider" />
              <li>
                <Link
                  className="text-xs uppercase py-3 font-bold block"
                  to="/auth/logout"
                >
                  <i className="fa fa-sign-out mr-3" />
                  Sign Out
                </Link>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </nav>

  );
}

export default AdminNavbar;
