const { NpmsIO } = require('npms.io');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    packages: Joi.array().items(Joi.string()).required().min(1),
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type NpmsioPackage implements Node {
      analyzedAt: Date!
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async (
  { actions, createNodeId, getNodesByType, createContentDigest, reporter },
  { packages }
) => {
  const { createNode } = actions;

  const npmsio = new NpmsIO().api.package;

  try {
    const supabasePackages = getNodesByType(`SupabasePackage`).map((node) => node.name);


    const allPackageData = await npmsio.multiPackageInfo(Array.from(new Set([...packages, ...supabasePackages])));

    for (const packageData of Object.entries(allPackageData)) {
      const [name, data] = packageData;

      const nodeData = {name, ...data}

      createNode({
        ...nodeData,
        id: createNodeId(`npmsio-${name}-${data.analyzedAt}`),
        parent: null,
        children: [],
        internal: {
          type: `NpmsioPackage`,
          content: JSON.stringify(nodeData),
          contentDigest: createContentDigest(nodeData),
        },
      });
    }
  } catch (e) {
    reporter.panic("Error sourcing package data from npms.io", e);
  }
};