exports.createSchemaCustomization = ({ actions }, { types }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SupabasePackage implements Node {
      npmsio: NpmsioPackage @link(by: "name" from: "name")
    }
  `;
  createTypes(typeDefs);
};