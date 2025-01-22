import styles from "./styles.module.css";

const Img =
  require("@site/static/img/HomePage/OpportunitySection/card5/img.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card5/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Img className={styles.img} role="img" />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
