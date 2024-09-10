import React, { useState, useEffect } from 'react';
import { useAuthLoginMutation } from 'src/services/index.api';

import logo from 'src/assets/hashtag.png';
import { useNavigate } from 'react-router-dom';
import { useAuthPersistStore } from 'src/store';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const signIn = useAuthPersistStore((state) => state.signIn);

  const { mutate, isLoading, isSuccess, data: loginData } = useAuthLoginMutation();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    mutate({ username, password });

    setError('');
  };
  useEffect(() => {
    if (isSuccess) {
      signIn({ token: loginData.data.token });
      navigate('/');
    }
  }, [isSuccess]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">Login to Your Account</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="text"
                name="text"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading} // Отключить кнопку при загрузке
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 mr-3 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
