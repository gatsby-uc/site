import { DarkModeToggle } from 'react-dark-mode-toggle-2';

import Logo from './Logo';

export default function Header({ isDarkMode, setIsDarkMode }) {
  return (
    <header className="md:max-h-32 flex items-center justify-between">
      <div className="w-32 md:mr-4">
        <Logo className="" />
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <DarkModeToggle
          onChange={setIsDarkMode}
          isDarkMode={isDarkMode}
          size={65}
        />
      </div>
    </header>
  );
}
