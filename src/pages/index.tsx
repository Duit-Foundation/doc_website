import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import OpportunitySection from "@site/src/components/HomePage/OpportunitySection";
import Divider from "@site/src/components/divider";
import PromoSection from "@site/src/components/HomePage/PromoSection";
import BrowserOnly from "@docusaurus/BrowserOnly";
import MainSection from "@site/src/components/HomePage/mainSection";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend-driver UI framwork for Flutter"
    >
      <main>
        {/* <MainSection /> */}
        {/* <PromoSection /> */}
        {/* <section className="container">
          <BrowserOnly children={() => <Divider />} />
        </section> */}
        <OpportunitySection />
      </main>
    </Layout>
  );
}
