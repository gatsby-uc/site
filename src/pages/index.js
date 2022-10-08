import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import Layout from '../components/Layout';
import Seo from '../components/Seo'

import iconMap from '../components/Icons';
import SimpleIcon from '../components/SimpleIcon';

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
      <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center gap-16 md:gap-32">
          <h1 className="text-6xl md:text-8xl text-center font-bold font-sans">
            <span className="text-gatsby-purple">Gatsby</span>{' '}
            <span className="text-guc-bright-pink">User</span> Collective
          </h1>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 xl:gap-64">
            {socials.map((item) => {
              const socialIcon = iconMap[item.name.toLowerCase()];
              return (
                <li key={item.name} className="flex flex-col items-center">
                  <div className="">
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 ">
                      <span className="sr-only">{item.name}</span>
                      <span style={{ color: `#${socialIcon.hex}` }} className="">
                        <SimpleIcon
                          className={`h-32 w-32 text-blue saturate-50 dark:saturate-100 hover:opacity-75 ${
                            item.color === '#181717' ? 'dark:invert' : null
                          }`}
                          aria-hidden="true"
                          icon={socialIcon}
                        />
                      </span>
                    </a>
                  </div>
                  <h2
                    className={`text-center text-2xl ${
                      item.color === '#181717' ? 'dark:invert' : null
                    }`}
                    style={{ color: item.color }}
                  >
                    {item.cta}.
                  </h2>
                </li>
              );
            })}
          </ul>

          <a href="#intro-video" className="my-12">
            Learn More!
          </a>
        </div>
      </div>

      <div id="intro-video" className="m-auto w-7/8 md:w-1/2">
        <LiteYouTubeEmbed
          id="B92m1joOLME"
          title="Sustainably Maintaining the Gatsby Plugin Ecosystem"
          className="w-100 h-100"
          poster='hqdefault'
        />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <Seo />
)