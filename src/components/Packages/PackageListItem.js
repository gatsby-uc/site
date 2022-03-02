import * as React from 'react';
import { Link } from 'gatsby';
import { DocumentTextIcon } from '@heroicons/react/outline';

import GatsbySvg from '../../images/gatsby.svg';
import NpmSvg from '../../images/npm.svg';
import { ScoreList } from './ScoreList';
import './packageList.css';

export function PackageListItem({ packageData }) {
  return (
    <li className="group block hover:bg-gray-50 hover:dark:bg-slate-500 duration-1000 transition-all">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between duration-1000">
          <Link to={packageData.packagePath} className="">
            <p className="text-lg font-semibold text-blue-600 dark:text-pink-600 truncate">
              {packageData.name}
            </p>
          </Link>
          <ScoreList scores={packageData.npmsio.score} />
        </div>
        <div className="my-4">
          <p className="text-md font-extralight text-center sm:text-left sm:m-0">
            {packageData.npmsio.collected.metadata.description}
          </p>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-between overflow-hidden">
          <div className="">
            <p className="flex items-center text-sm text-gray-500 dark:text-slate-200">
              Published&nbsp;
              <time dateTime={packageData.last_analyzed_at}>
                {packageData.npmsio.collected.metadata.lastUpdated}
              </time>
            </p>
          </div>
          <div className="mt-2 flex gap-2 items-center text-sm text-gray-500 sm:mt-0 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <a href={packageData.npmsio.collected.metadata.links.npm} title="npm" target="_blank">
              <NpmSvg className="fill-red-500 h-4 w-fit" />
            </a>
            <a
              href={packageData.npmsio.collected.metadata.links.npm}
              title="Readme"
              target="_blank"
            >
              <DocumentTextIcon className="h-6 dark:text-white" />
            </a>
            <a href={`https://gatsbyjs.com/plugins/${packageData.name}`} title="Gatsby" target="_blank">
              <GatsbySvg className="h-6" />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
