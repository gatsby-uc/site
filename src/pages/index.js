import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import socialIcons from '../components/Icons';

const IndexPage = () => {
  const {
    allSocialJson: { socials },
  } = useStaticQuery(graphql`
    {
      allSocialJson {
        socials: nodes {
          name
          href
          cta
          color
        }
      }
    }
  `);
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className='flex flex-col items-center'>
          <h1 className="text-6xl md:text-8xl mb-16 mt-8 md:mb-64 text-center font-bold"><span className='text-gatsby-purple'>Gatsby</span> <span className='text-guc-bright-pink'>User</span> Collective</h1>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 xl:gap-64">
            {socials.map((item) => {
              const SocialIcon =
                socialIcons[item.name.toLowerCase()] ?? (() => "There's been an error");
              return (
                <li key={item.name} className="flex flex-col items-center">
                  <div className="">
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 ">
                      <span className="sr-only">{item.name}</span>
                      <span style={{ color: item.color }} className=''>
                        <SocialIcon className={`h-32 w-32 text-blue saturate-50 dark:saturate-100 hover:opacity-75 ${item.color === "#181717" ? "dark:invert" : null}`} aria-hidden="true" />
                      </span>
                    </a>
                  </div>
                  <h2 className={`text-center text-2xl ${item.color === "#181717" ? "dark:invert" : null}`} style={{ color: item.color }} >{item.cta}.</h2>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
