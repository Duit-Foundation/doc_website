import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const Svg =
  require("@site/static/img/HomePage/PromoSection/UserServer.svg").default;

const client = <Translate>promo_svg_client</Translate>
const server = <Translate>promo_svg_server</Translate>

const ch1 = <Translate>promo_svg_ch1</Translate>
const ch2 = <Translate>promo_svg_ch2</Translate>
const ch3 = <Translate>promo_svg_ch3</Translate>
const ch4 = <Translate>promo_svg_ch4</Translate>

export default function Chat(): JSX.Element {
  return (
    <div className={styles.container}>
      <Svg className={styles.chat} role="img" />
    </div>
  );
}
