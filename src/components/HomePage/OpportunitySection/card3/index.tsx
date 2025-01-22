import styles from "./styles.module.css";

const Phone =
  require("@site/static/img/HomePage/OpportunitySection/card3/phone.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card3/bg.svg").default;

export default function Card3(): JSX.Element {
  return (
    <div className={styles.container}>
      <Background className={styles.bg} role="img" />
      <Phone className={styles.img} role="img" />
    </div>
  );
}
