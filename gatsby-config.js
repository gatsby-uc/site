require('dotenv').config()

const {
  GA_MEASUREMENT_ID,
  GITHUB_TOKEN,
  SUPABASE_API_URL,
  SUPABASE_ANON_KEY
} = process.env;

const otherPlugins = [];
GA_MEASUREMENT_ID &&
  otherPlugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [GA_MEASUREMENT_ID], // Google Analytics / GA
      pluginConfig: {
        head: true,
      },
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
        supabaseUrl: SUPABASE_API_URL,
        supabaseKey: SUPABASE_ANON_KEY,
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
    {
      resolve: `gatsby-source-github-contributors`,
      options: {
        repo: "gatsby-uc/plugins",
        token: GITHUB_TOKEN
      }
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
