import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import OpportunitySection from "@site/src/components/HomePage/OpportunitySection";
import Divider from "@site/src/components/HomePage/divider";
import PromoSection from "@site/src/components/HomePage/PromoSection";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend-driver UI framwork for Flutter"
    >
      <main>
        <PromoSection />
        <Divider/>
        <OpportunitySection />
      </main>
    </Layout>
  );
}
