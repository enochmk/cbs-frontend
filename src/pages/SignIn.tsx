import { LockClosedIcon } from '@heroicons/react/solid';

import logoImg from '../assets/img/logo.png';

function SignIn() {
  return (
    <div className="min-h-full flex items-center justify-center -my-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-1/3 m-5 p-5">
        <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
        <h2 className="text-center text-3xl font-extrabold text-gray-500">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input input-bordered w-full rounded-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full rounded-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-primary relative"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignIn;
