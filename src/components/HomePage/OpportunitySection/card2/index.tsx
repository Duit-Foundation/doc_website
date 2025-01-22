import styles from "./styles.module.css";

const Group1 =
  require("@site/static/img/HomePage/OpportunitySection/card2/067.svg").default;
const Group2 =
  require("@site/static/img/HomePage/OpportunitySection/card2/087.svg").default;
const Group3 =
  require("@site/static/img/HomePage/OpportunitySection/card2/Btn.svg").default;
const Group4 =
  require("@site/static/img/HomePage/OpportunitySection/card2/Buttom.svg").default;
const Group5 =
  require("@site/static/img/HomePage/OpportunitySection/card2/Contacts.svg").default;
const Group6 =
  require("@site/static/img/HomePage/OpportunitySection/card2/Group 51.svg").default;
const Group7 =
  require("@site/static/img/HomePage/OpportunitySection/card2/Progress Bar.svg").default;
const Background =
  require("@site/static/img/HomePage/OpportunitySection/card2/bg.svg").default;

export default function Card1(): JSX.Element {
  return (
    <div className={styles.container}>
      <Group3 className={styles.img3} role="img" />
      <Group4 className={styles.img4} role="img" />
      <Group5 className={styles.img5} role="img" />
      <Group1 className={styles.img1} role="img" />
      <Group2 className={styles.img2} role="img" />
      <Group6 className={styles.img6} role="img" />
      <Group7 className={styles.img7} role="img" />
      <Background className={styles.bg} role="img" />
    </div>
  );
}
