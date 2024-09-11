import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from 'src/data';

import logo from 'src/assets/logo.png';
import { useAuthPersistStore } from 'src/store';
import { Dropdown } from '../Dropdown';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  const token = useAuthPersistStore((state) => state.token);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img alt="Logo" src={logo} className="w-auto h-8" />
          </Link>
        </div>
        <div className="flex gap-4 lg:hidden">
          <Dropdown />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="w-6 h-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navLinks.map(({ id, title, link }) => (
            <Link
              key={id}
              to={link}
              className={`${
                pathname === link && 'text-primary'
              } text-sm font-semibold leading-6 text-gray-900`}
            >
              {title}
            </Link>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <Dropdown />
          ) : (
            <Link
              to="/login"
              className="inline-block px-8 py-3 text-sm font-medium text-white transition rounded bg-primary hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="Logo" src={logo} className="w-auto h-8" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="flow-root mt-10">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navLinks.map(({ id, title, link }) => (
                  <Link
                    key={id}
                    to={link}
                    className={`${
                      pathname === link && 'bg-primary text-white hover:bg-primary'
                    } block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50`}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
