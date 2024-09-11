import React, { useState, useEffect, useRef } from 'react';
import { useGetAuthUserQuery } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';

import logo from 'src/assets/logo.png';

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useGetAuthUserQuery();

  const signOut = useAuthPersistStore((state) => state.signOut);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => signOut();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node)
    )
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        <img
          src={user?.data.image ?? logo}
          alt={`${user?.data.firstName} ${user?.data.lastName}`}
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 w-64 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="p-4">
            <div className="flex items-center">
              <img
                src={user?.data.image ?? logo}
                alt={`${user?.data.firstName} ${user?.data.lastName}`}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{`${user?.data.firstName} ${user?.data.lastName}`}</h3>
                <p className="overflow-hidden text-sm text-gray-500 w-36 whitespace-nowrap">
                  {user?.data.email}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Age:</span>
                <span className="text-sm text-gray-800">{user?.data.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Gender:</span>
                <span className="text-sm text-gray-800 capitalize">{user?.data.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="text-sm text-gray-800">{user?.data.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Birth Date:</span>
                <span className="text-sm text-gray-800">{user?.data.birthDate}</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              className="block w-full px-4 py-2 text-sm text-center text-white bg-red-500 hover:bg-red-600"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
