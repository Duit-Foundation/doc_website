import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

const btnText = <Translate>doc_button</Translate>; //Документация

export default function DocBtn(): JSX.Element {
      const history = useHistory();
      const handleOnCLick = () => history.push("/docs/intro");
  return (
    <div className={styles.container}>
        <button className={styles.btn} onClick={handleOnCLick}>{btnText}</button>
    </div>
  );
}
