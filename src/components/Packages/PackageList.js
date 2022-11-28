import * as React from 'react';
import { PackageListItem } from './PackageListItem';

export function PackageList({ packages }) {
  return (
    <div className="bg-pink-50 dark:bg-blue-900 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-300">
        {packages ? packages.map((packageData) => {

          return (
            <PackageListItem key={packageData.id} packageData={packageData} />
          );
        }) : <p>No packages found. 🤔 Something is not right...</p>}
      </ul>
    </div>
  );
}
