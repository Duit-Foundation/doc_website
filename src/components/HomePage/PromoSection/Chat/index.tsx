import styles from "./styles.module.css";

const Svg =
  require("@site/static/img/HomePage/PromoSection/UserServer.svg").default;

export default function Chat(): JSX.Element {
  return (
    <div className={styles.container}>
      <Svg className={styles.chat} role="img" />
    </div>
  );
}
