import { Helmet } from 'react-helmet';

import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-800">
        <Helmet bodyAttributes={{ class: 'h-full' }} htmlAttributes={{ class: 'h-full' }} />
        <main className="h-full flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
