import styles from "./styles.module.css";

const Group =
  require("@site/static/img/HomePage/OpportunitySection/card1/Group 21.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card1/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Group className={styles.img1} role="img" />
      <img
        src="img/HomePage/OpportunitySection/card1/image 22.svg"
        alt="image22"
        className={styles.img2}
      />
      <img
        src="img/HomePage/OpportunitySection/card1/image 21.svg"
        alt="image21"
        className={styles.img3}
      />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
