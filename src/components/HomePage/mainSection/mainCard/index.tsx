import styles from "./styles.module.css";
import Card from "../card";
import Translate from "@docusaurus/Translate";
import { useHistory } from "react-router-dom";
import type { Card as tCard } from "../types";

const title1 = <Translate>main_card_t1</Translate>; //Duit - backend-driven UI
const title2 = <Translate>main_card_t2</Translate>; //фреймворк с открытым
const title3 = <Translate>main_card_t3</Translate>; //исходным кодом
const description = <Translate>main_card_description</Translate>; // Реализация BDUI уже никогда не будет настолько простой
const btnText = <Translate>main_card_doc_button</Translate>;

export default function MainCard(): JSX.Element {
  const history = useHistory();
  const handleOnCLick = () => history.push("/docs/intro");

  const data: tCard = {
    bgColor: "#E1E2E9",
    title: [title1, title2, title3],
    description,
    btnText,
    handleOnCLick,
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <div className={styles.header}>
          {title1}
          {title2}
          {title3}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.mainCardMobile}>
        <Card {...data} />
      </div>
    </div>
  );
}
