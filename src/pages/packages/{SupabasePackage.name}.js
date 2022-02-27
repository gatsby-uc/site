import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout';

export default function PackagePage({ data: { supabasePackage } }) {
  return (
    <Layout>
      <pre>{JSON.stringify(supabasePackage, null, 2)}</pre>;
    </Layout>
  );
}
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query ($id: String) {
    supabasePackage(id: { eq: $id }) {
      latestScores {
        final
        quality
        popularity
        maintenance
      }
    }
  }
`;
