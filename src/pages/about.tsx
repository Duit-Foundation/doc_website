import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import MainSection from "@site/src/components/aboutPage/mainSection";
import Divider from "../components/divider";
import TargetsSection from "@site/src/components/aboutPage/targetsSection";
import TeamSection from "@site/src/components/aboutPage/teamSection";

export default function About() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <MainSection />
      <TargetsSection />
      <Divider />
      <TeamSection />
    </Layout>
  );
}
