import styles from "./styles.module.css";
import Card from "../card";
import Translate from "@docusaurus/Translate";
import { useHistory } from "react-router-dom";

const title1 = "Duit - backend-driven UI ";
const title2 = "фреймворк с открытым ";
const title3 = "исходным кодом";
const description =
  "Реализация BDUI уже никогда не будет настолько простой";
const btnText = <Translate>Документация</Translate>;

export default function MainCard(): JSX.Element {
  const history = useHistory();
  const handleOnCLick = () => history.push("/docs/intro");

  const data = {
    bgColor: "#E1E2E9",
    title: title1 + title2 + title3,
    description,
    btnText,
    handleOnCLick,
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <div className={styles.header}>
          {title1+title2+title3}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
      <div className={styles.mainCardMobile}>
        <Card {...data} />
      </div>
    </div>
  );
}
