import * as React from 'react';
import Logo from '../images/logo.svg';

export default function JSLogo(props) {
  return (
    <div {...props} >
      <span className="sr-only">Gatsby User Collective</span>
      <div aria-hidden="true" className='max-h-full dark:bg-guc-pink p-4 pt-2 rounded-full'>
        <Logo />
      </div>
    </div>
  );
}
