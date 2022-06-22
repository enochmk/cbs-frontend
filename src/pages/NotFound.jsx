import { LockClosedIcon } from '@heroicons/react/solid';

import AuthNavbar from '../components/Navbar/AuthNavbar';
import AuthFooter from '../components/Footer/AuthFooter';

const logoImg = require('../assets/img/logo.png');

function SignIn() {
  return (
    <>
      <AuthNavbar />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
              NOT FOUND
            </h2>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
}

export default SignIn;
