import { useDarkMode } from '../libs/hooks';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <>
      <div className="flex min-h-screen flex-col p-4 bg-guc-pink dark:bg-guc-blue transition duration-1000 text-guc-blue dark:text-guc-pink">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="flex-1 grid my-8">{children}</main>
        <Footer />
      </div>
    </>
  );
}
