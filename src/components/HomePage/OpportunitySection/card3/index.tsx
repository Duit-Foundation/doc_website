import styles from "./styles.module.css";

const Img =
  require("@site/static/img/HomePage/OpportunitySection/card3/img.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card3/bg.svg").default;

export default function Card3(): JSX.Element {
  return (
    <div className={styles.container}>
      <Background className={styles.bg} role="img" />
      <Img className={styles.img} role="img" />
    </div>
  );
}
