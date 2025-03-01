import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";
import Card4 from "./card4";
import Card5 from "./card5";
import Card6 from "./card6";
import Translate from "@docusaurus/Translate";

type FeatureItem = {
  bgColor: string;
  title: JSX.Element;
  description: JSX.Element;
  Component: () => JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    bgColor: "#EED6AA",
    title: <Translate>opsec_card1_title</Translate>,
    description: <Translate>opsec_card1_description</Translate>,
    Component: Card1,
  },
  {
    bgColor: "#BFEFAF",
    title: <Translate>opsec_card2_title</Translate>,
    description: <Translate>opsec_card2_description</Translate>,
    Component: Card2,
  },
  {
    bgColor: "#E1E2E9",
    // title: "Компоненты Duit",
    title: <Translate>opsec_card3_title</Translate>,
    description: <Translate>opsec_card3_description</Translate>,
    Component: Card3,
  },
  {
    bgColor: "#D0DCE1",
    title: <Translate>opsec_card4_title</Translate>,
    description: <Translate>opsec_card4_description</Translate>,
    Component: Card4,
  },
  {
    bgColor: "#9DDBE7",
    title: <Translate>opsec_card5_title</Translate>,
    description: <Translate>opsec_card5_description</Translate>, //Делайте UI ярче, а разработку приятнее, интегрируя в Duit собственные конфигурации виджетов.
    Component: Card5,
  },
  {
    bgColor: "#EBE5E2",
    title: <Translate>opsec_card6_title</Translate>,
    description: <Translate>opsec_card6_description</Translate>, // Реализуйте анимации любой сложности в привычном ключе, достигая максимального контроля и производительности.
    Component: Card6,
  },
];

function FeatureCard({ bgColor, title, description, Component }: FeatureItem) {
  return (
    <div className={`${styles.card}`} style={{ backgroundColor: bgColor }}>
      <div>
      <div className={`text--left ${styles.description}`}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
        <div className="text--center">
          <Component />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container ${styles.container}`}>
        <Heading as="h1" className={styles.heading}>
          <Translate>opsec_title</Translate>
        </Heading>
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
