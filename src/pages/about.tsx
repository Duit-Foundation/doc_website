import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function About() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <h1>About page</h1>
      </Layout>
    );
  }