import { Link } from 'gatsby';
import Layout from '../components/layout';
import Logo from "../images/logo.svg"
export default function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/" className="inline-flex">
              <span className="sr-only">Gatsby UC</span>
              <div className='h-24 w-24'>
              <Logo />
              </div>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Status
            </Link>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <Link href="https://twitter.com/gatsby_uc" traget="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-600" rel='noopener'>
              Twitter
            </Link>
          </nav>
        </footer>
      </div>
    </Layout>
  );
}
