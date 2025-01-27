import styles from "./styles.module.css";

const Contacts =
  require("@site/static/img/HomePage/OpportunitySection/card6/contacts.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card6/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Contacts className={styles.img} role="img" />
      <img
        src="img/HomePage/OpportunitySection/card6/Avatar-3.png"
        alt="A"
        className={styles.img1}
      />
      <img
        src="img/HomePage/OpportunitySection/card6/Avatar-2.png"
        alt="B"
        className={styles.img2}
      />
      <img
        src="img/HomePage/OpportunitySection/card6/Avatar.png"
        alt="C"
        className={styles.img3}
      />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
