import styles from "./styles.module.css";

const Group18 =
  require("@site/static/img/HomePage/PromoSection/Group 18.svg").default;
const Group =
  require("@site/static/img/HomePage/PromoSection/Group.svg").default;
const UserServer =
  require("@site/static/img/HomePage/PromoSection/UserServer.svg").default;

export default function Chat(): JSX.Element {
  return (
    <div className={styles.container}>
      <Group className={styles.img1} role="img" />
      <UserServer className={styles.chat} role="img" />
      <Group18 className={styles.img2} role="img" />
    </div>
  );
}
