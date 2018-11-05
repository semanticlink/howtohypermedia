import fs from "fs"
import pify from "pify"
import util from 'util'

export const writeFile = pify(fs.writeFile)

export const runQuery = (handler, query) =>
  handler(query).then(r => {
    if (r.errors) {
      console.error(r.errors)
      console.error(util.inspect(r.errors,  { showHidden: true, depth: null }))
      throw new Error(r.errors.join(`, `))
    }

    return r.data
  })

export const defaultOptions = {
  query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      
      allSitePage(
        filter: {
          path: {ne: "/dev-404-page/"}
        }
      ) {
        edges {
          node {
            path
          }
        }
      }
  }`,
  output: `/sitemap.xml`,
  serialize: ({ site, allSitePage }) =>
    allSitePage.edges.map(edge => {
      return {
        url: site.siteMetadata.siteUrl + edge.node.path,
        changefreq: `daily`,
        priority: 0.7,
      }
    }),
}
