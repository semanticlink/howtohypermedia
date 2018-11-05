const algoliasearch = require("algoliasearch");

module.exports = {
  syncToAlgolia: function syncToAlgolia(data, appId, apiKey, clientIndex) {
    const client = algoliasearch(appId, apiKey);
    const index = client.initIndex(clientIndex);

    const objects = data.allMarkdownRemark.edges
      .map(edge => edge.node)
      .map(node => ({
        title: node.frontmatter.title,
        objectID: node.fields.slug,
        body: node.excerpt
      }));

    index.clearIndex((clearErr, clearContent) => {
      index.saveObjects(objects, (err, content) => {
        if (!err) {
          console.log(`Successfully synced ${objects.length} items to Algolia`);
        } else {
          console.error(`Error while syncing to Algolia`, err);
        }
      });
    });
  }
};
