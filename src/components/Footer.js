import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import iconMap from "./Icons";


export default function Footer() {
  const {
    allSocialJson: { socials },
  } = useStaticQuery(graphql`
    {
      allSocialJson {
        socials: nodes {
          name
          href
        }
      }
    }
  `);
  return (
    <footer className="">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socials.map((item) => {
            const SocialIcon = iconMap[item.name.toLowerCase()];
            return (
              <a key={item.name} href={item.href} className="hover:opacity-50">
                <span className="sr-only">{item.name}</span>
                <SocialIcon className="h-6 w-6" aria-hidden="true" fill="currentColor" />
              </a>
            );
          })}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base tracking-tighter">
            &copy; 2022 Gatsby User Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
