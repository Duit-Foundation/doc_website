import styles from "./styles.module.css";

const Contacts =
  require("@site/static/img/HomePage/OpportunitySection/card6/contacts.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card6/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Contacts className={styles.img} role="img" />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
