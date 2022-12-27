import * as React from 'react';
import { graphql } from 'gatsby';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import Layout from '../components/Layout';
import Seo from '../components/Seo'
import iconMap from '../components/Icons';
import Prose from '../components/Prose';
import { formatCountingNumber } from '../libs/numbers';
import { useLocale } from '../libs/hooks';

const IndexPage = ({ data }) => {
  const {
    allSocialJson: { socials },
    allSupabasePackage: {
      totalCount: totalPackageCount,
      totalMonthlyDownloads
    },
    allGitHubContributor: {
      totalCount: totalContributorCount
    }

  } = data;

  const stats = [
    {
      name: "Packages",
      value: totalPackageCount,
    },
    {
      name: "Contributors",
      value: totalContributorCount,
    },
    {
      name: "Downloads",
      value: totalMonthlyDownloads,
    },
  ];

  const locale = useLocale();
  return (
    <Layout>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center gap-16 md:gap-32">
          <h1 className="text-6xl md:text-8xl text-center font-bold font-sans">
            <span className="text-gatsby-purple">Gatsby</span>{' '}
            <span className="text-guc-bright-pink">User</span> Collective
          </h1>
          <Prose>The GUC exists to empower the Gatsby community to build and maintain the plugins we use every day. Instead of waiting on a burned-out maintainer or distracted company, anyone can be a maintainer. Those maintainers do the work they want when they want to do it.</Prose>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 xl:gap-64">
            {stats.map((stat) => (
              <li key={stat.name} className="flex flex-col items-center gap-4">
                <div className="text-4xl">
                  <span className="sr-only">{stat.name}</span>
                  {formatCountingNumber(stat.value, locale)}
                </div>
                <h2
                  className={`text-center text-2xl`}
                >
                  {stat.name}.
                </h2>
              </li>
            )
            )}
          </ul>
          <Prose>All are welcome to come and contibute new plugins, donate existing ones, fix bugs, and add features. <em>Come Join the community!</em></Prose>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 xl:gap-64">
            {socials.map((item) => {
              const SocialIcon = iconMap[item.name.toLowerCase()];
              return (
                <li key={item.name} className="flex flex-col items-center">
                  <div className="">
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 ">
                      <span className="sr-only">{item.name}</span>
                      <SocialIcon
                        className={`h-32 w-32 text-blue saturate-50 dark:saturate-100 hover:opacity-75 ${item.color === '#181717' ? 'dark:invert' : null
                          }`}
                        color={item.color}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <h2
                    className={`text-center text-2xl ${item.color === '#181717' ? 'dark:invert' : null
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

export const query = graphql`
{
  allSupabasePackage {
    totalCount
    totalMonthlyDownloads: sum(
      field: {npmsio: {evaluation: {popularity: {downloadsCount: SELECT}}}}
    )
  }
  allGitHubContributor {
    totalCount
  }
  allSocialJson {
    socials: nodes {
      name
      href
      cta
      color
    }
  }
}`;