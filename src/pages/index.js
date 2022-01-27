import Layout from "../components/layout";
import Logo from "../components/Logo";
const IndexPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold underline">Gatsby User Collective</h1>
      <Logo className="h-64 w-64" />
    </Layout>
  );
};

export default IndexPage;
