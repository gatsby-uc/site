import * as React from 'react';
import { PackageListItem } from './PackageListItem';

export function PackageList({ packages }) {
  return (
    <div className="bg-pink-50 dark:bg-blue-900 shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-300">
        {packages.map((packageData) => {
          
          return (
            <PackageListItem key={packageData.id} packageData={packageData} />
          );
        })}
      </ul>
    </div>
  );
}
