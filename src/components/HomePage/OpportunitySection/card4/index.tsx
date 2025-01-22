import styles from "./styles.module.css";

const Social =
  require("@site/static/img/HomePage/OpportunitySection/card4/social.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card4/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Social className={styles.img} role="img" />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
