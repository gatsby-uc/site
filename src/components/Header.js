import * as React from 'react';
import { Link } from 'gatsby';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import DarkModeSwitch from './DarkModeSwitch';
import Logo from './Logo';

const navItems = [
  {
    label: 'Plugins',
    path: '/packages/',
  },
];

const NavMenu = () => (
  <ul>
    {navItems?.map(({ label, path }, id) => (
      <li key={id}>
        <Link to={path}>{label}</Link>
      </li>
    ))}
  </ul>
);

export default function Header() {
  return (
    <header className="md:max-h-32 ">
      <Popover className={'relative'}>
        <div className="flex items-center justify-between mx-6 border-b-2 border-guc-blue dark:border-guc-pink py-6 md:space-x-10">
          <div className="w-32 md:mr-4">
            <Logo className="" />
          </div>
          <div className=" md:hidden">
            <Popover.Button className="nav-button">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-8 w-8" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <NavMenu navItems={navItems} />
          </Popover.Group>
          <div className="hidden md:flex md:mt-0 md:ml-4">
            <DarkModeSwitch />
          </div>
        </div>
        <Transition
          as={React.Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg bg-guc-pink dark:bg-guc-blue ring-1 ring-guc-blue dark:ring-guc-pink ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Logo className="w-32" />
                  </div>
                  <div className="-mr-1 -mt-1">
                    <Popover.Button className="å">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="nav-button" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <NavMenu navItems={navItems} />
                  </nav>
                </div>
                <DarkModeSwitch />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
