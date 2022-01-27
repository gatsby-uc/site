const { GATSBY_ACKEE_DOMAIN_ID, GATSBY_ACKEE_SERVER } = process.env;

const otherPlugins = [];
GATSBY_ACKEE_DOMAIN_ID &&
  GATSBY_ACKEE_SERVER &&
  otherPlugins.push({
    resolve: 'gatsby-plugin-ackee-tracker',
    options: {
      domainId: GATSBY_ACKEE_DOMAIN_ID || '',
      server: GATSBY_ACKEE_SERVER || '',
      detailed: true,
    },
  });

module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: `Gatsby UC`,
    siteUrl: `https://gatsbyuc.dev`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.svg',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    ...otherPlugins,
  ],
};
