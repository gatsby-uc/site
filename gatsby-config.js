const {
  GATSBY_ACKEE_DOMAIN_ID,
  GATSBY_ACKEE_SERVER
} = process.env;

module.exports = {
  siteMetadata: {
    title: `Gatsby UC`,
    siteUrl: `https://gatsbyuc.dev`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-ackee-tracker",
      options: {
        domainId: GATSBY_ACKEE_DOMAIN_ID || "",
        server: GATSBY_ACKEE_SERVER || "",
        detailed: true,
      }
    }
  ],
};
