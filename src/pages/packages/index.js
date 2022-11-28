import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo'
import { PackageList } from '../../components/Packages';

export default function PackagePage({ data }) {
  const supabasePackages = data?.allSupabasePackage?.nodes;

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-center sm:mx-8 ">
        <PackageList packages={supabasePackages} />
      </div>
    </Layout>
  );
}

export const query = graphql`query allPackages {
  allSupabasePackage(sort: {name: ASC}) {
    nodes {
      id
      name
      last_analyzed_at
      prettyDate: last_analyzed_at(formatString: "dddd DD MMMM YYYY")
      packagePath: gatsbyPath(filePath: "/packages/{SupabasePackage.name}")
      npmsio {
        score {
          final
          detail {
            quality
            popularity
            maintenance
          }
        }
        collected {
          metadata {
            description
            lastUpdated: date(fromNow: true)
            version
            links {
              npm
            }
          }
        }
      }
    }
  }
}`;

export const Head = () => (
  <Seo title="packages" />
);