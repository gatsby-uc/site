const { createClient } = require('@supabase/supabase-js');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    supabaseUrl: Joi.string()
      .uri({
        allowRelative: false,
      })
      .required(),
    supabaseKey: Joi.string().required(),
    types: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(),
          query: Joi.function().arity(1).required(),
          definition: Joi.string().optional(),
        })
      )
      .required()
      .min(1),
  });
};

exports.createSchemaCustomization = ({ actions }, { types }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SupabasePackage implements Node {
      name: String!
      created_at: Date! @dateformat
      last_analyzed_at: Date @dateformat
      historicalScores: [SupabasePackageScore] @link(by: "package", from: "name")
    }

    type SupabasePackageScore implements Node {
      package: String!
      analyzed_at: Date! @dateformat
      final: Float!
      quality: Float!
      popularity: Float!
      maintenance: Float!
      created_at: Date! @dateformat
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  { supabaseUrl, supabaseKey, types }
) => {
  const { createNode } = actions;

  const supabase = createClient(supabaseUrl, supabaseKey);

  for (const type of types) {
    const { type: typeName, query } = type;

    try {
      const { data, error } = await query(supabase);

      if (!Array.isArray(data) && !data?.length > 0) {
        reporter.panicOnBuild("No data found for type '" + typeName + "'", error);
        continue;
      }

      for (const item of data) {
        createNode({
          ...item,
          databaseId: item.id,
          id: createNodeId(`supabase-${typeName}-${item.id}`),
          parent: null,
          children: [],
          internal: {
            type: `Supabase${typeName}`,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      }
    } catch (e) {
      reporter.panic("Error sourcing nodes data for type '" + typeName + "'", e);
    }
  }
};
