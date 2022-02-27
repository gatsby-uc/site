import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/Layout';

export default function PackagePage({ data}) {
  const supabasePackages = data?.allSupabasePackage?.nodes;
  
  return (
    <Layout>
    <ul>
      {supabasePackages?.length > 0
        ? supabasePackages.map((packageData) => (
            <li>
              <Link to={packageData.packagePath}>
                <pre>{JSON.stringify(packageData, null, 2)}</pre>
              </Link>
            </li>
          ))
        : null}
    </ul>
    </Layout>
  );
}
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query allPackages {
    allSupabasePackage {
      nodes {
        name
        packagePath: gatsbyPath(filePath: "/packages/{SupabasePackage.name}")
        latestScores {
          final
          quality
          popularity
          maintenance
        }
      }
    }
  }
`;
