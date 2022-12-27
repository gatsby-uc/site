import * as React from 'react';
import { LocaleProvider } from '../libs/hooks';
import Footer from './Footer';
import Header from './Header';


export default function Layout({ children }) {
  return (
    <LocaleProvider>
      <div className="flex min-h-screen flex-col bg-guc-pink dark:bg-guc-blue transition duration-1000 text-guc-blue dark:text-guc-pink">
        <Header />
        <main className="flex-1 grid my-8">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
