import * as React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-guc-bright-pink uppercase tracking-wide">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold dark:text-guc-pink tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="text-base font-medium text-guc-bright-pink hover:text-indigo-500"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <Seo title="Page Not Found" />
);
