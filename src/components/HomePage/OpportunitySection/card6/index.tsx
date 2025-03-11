import styles from "./styles.module.css";

const Background =
  require("@site/static/img/HomePage/OpportunitySection/card6/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <img
        src="img/HomePage/OpportunitySection/6.png"
        alt="image22"
        className={styles.img}
      />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
