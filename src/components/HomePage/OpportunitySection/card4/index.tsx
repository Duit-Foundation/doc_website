import styles from "./styles.module.css";

const Img =
  require("@site/static/img/HomePage/OpportunitySection/card4/img.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card4/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Img className={styles.img} role="img" />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
