require('dotenv').config()

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
  siteMetadata: {
    title: `Gatsby UC`,
    siteUrl: `https://gatsbyuc.dev`,
  },
  plugins: [
    // Data plugins
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/',
      },
    },
    {
      resolve: 'gatsby-source-supabase',
      options: {
        supabaseUrl: process.env.SUPABASE_API_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY,
        types: [
          {
            type: 'Package',
            query: (client) => client.from('packages').select('*'),
          },
          {
            type: 'PackageScore',
            query: (client) => client.from('package-scores').select('*'),
          }
        ]
      },
    },
    {
      resolve: 'gatsby-source-npmsio',
      options: {
        packages: [
          "gatsby-plugin-fastify",
        ]
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',

    //Integration Plugins
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',

    // Plumbing Plugins
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo.svg',
      },
    },


    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    
    // 3rd party plugins
    ...otherPlugins,
  ],
};
