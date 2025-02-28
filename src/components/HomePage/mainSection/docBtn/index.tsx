import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const btnText = <Translate>doc_button</Translate>; //Документация

export default function DocBtn(): JSX.Element {
  return (
    <div className={styles.container}>
        <Link to="/docs/intro">
          <button className={styles.btn}>{btnText}</button>
        </Link>
    </div>
  );
}
