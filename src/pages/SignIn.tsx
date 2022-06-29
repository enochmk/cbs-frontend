import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn } from '../features/auth/authSlice';
import logoImg from '../assets/img/logo.png';
import signInService from '../services/auth/signIn.service';
import getUserDetailsService from '../services/auth/getUserDetails.service';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const accessToken = await signInService({ username, password });
      const details = await getUserDetailsService(accessToken);

      const data = {
        accessToken,
        user: details.user,
      };

      dispatch(signIn(data));
      navigate('/admin/adjust-account');
    } catch (error: any) {
      console.error(error?.response?.data?.message);
      setMessage(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center -my-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-1/3 m-5 p-5">
        <img className="mx-auto h-12 w-auto" src={logoImg} alt="logo" />
        <h2 className="text-center text-3xl font-extrabold text-gray-500">
          Sign in to your account
        </h2>
        {message && (
          <div className="alert alert-error shadow-lg mt-4 p-2 bg-red-500">
            <div className="w-full justify-center text-white text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{message}.</span>
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="false"
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
