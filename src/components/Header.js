import * as React from 'react';
import DarkModeSwitch from './DarkModeSwitch';

import Logo from './Logo';

export default function Header() {
  return (
    <header className="md:max-h-32 flex items-center justify-between">
      <div className="w-32 md:mr-4">
        <Logo className="" />
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <DarkModeSwitch />
      </div>
    </header>
  );
}
