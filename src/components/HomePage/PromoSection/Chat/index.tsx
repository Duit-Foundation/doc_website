import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const Top = require("@site/static/img/HomePage/promoSection/top.svg").default;
const Bottom =
  require("@site/static/img/HomePage/promoSection/bottom.svg").default;

const client = <Translate>promo_svg_client</Translate>;
const server = <Translate>promo_svg_server</Translate>;

const ch1 = <Translate>promo_svg_ch1</Translate>;
const ch2 = <Translate>promo_svg_ch2</Translate>;
const ch3 = <Translate>promo_svg_ch3</Translate>;
const ch4 = <Translate>promo_svg_ch4</Translate>;

export default function Chat(): JSX.Element {
  return (
    <div className={styles.container}>
      <Top role="svg" className={styles.topSvg} />
      <div className={styles.chatList}>
        <div className={`${styles.chatItem} ${styles.client}`}>
          <div className={styles.autor}>{client}</div>
          <div className={styles.text}>{ch1}</div>
        </div>
        <div className={`${styles.chatItem} ${styles.server}`}>
          <div className={styles.autor}>{server}</div>
          <div className={styles.text}>{ch2}</div>
        </div>
        <div
          className={`${styles.chatItem} ${styles.client}`}
          style={{ width: 260, maxWidth: 260 }}
        >
          <div className={styles.autor}>{client}</div>
          <div className={styles.text}>{ch3}</div>
        </div>
        <div
          className={`${styles.chatItem} ${styles.server}`}
          style={{ width: 300, maxWidth: 300 }}
        >
          <div className={styles.autor}>{server}</div>
          <div className={styles.text}>{ch4}</div>
        </div>
      </div>
      <Bottom role="svg" className={styles.bottomSvg} />
    </div>
  );
}
