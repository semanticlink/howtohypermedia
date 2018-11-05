module.exports = {
  siteMetadata: {
    title: `How to Hypermedia`,
    siteUrl: `https://howtohypermedia.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
/*
// replaced with gatsby-remark-copy-images because locally
// served images were weirdly placed on the screen compared
// with those served from https://imgur.com
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 840,
            },
          },
*/
          {
            resolve: `gatsby-remark-copy-images`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-jsx`,
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    `gatsby-plugin-typescript`,
    `styled-jsx-plugin`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-74131346-111',
    //   },
    // },
    // `gatsby-plugin-offline`
  ],
}
