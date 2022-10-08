import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import AwkwardGif from '../../images/awkward.gif';

export default function PackagePage({ data: { supabasePackage } }) {
  return (
    <Layout>
      <div className="mx-auto text-guc-blue dark:text-guc-pink space-y-8">
        <h1 className="font-bold text-3xl">{supabasePackage.name}</h1>
        <p>Well this is awkward...we're not quite done building this.</p>
        <img className="m-auto" src={AwkwardGif} alt="I'm okay with it being awkward between us" />
      </div>
    </Layout>
  );
}
// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query ($id: String) {
    supabasePackage(id: { eq: $id }) {
      name
    }
  }
`;

export const Head = ({
  data: {
    supabasePackage: { name },
  },
}) => <Seo title={['package', name]} />;
