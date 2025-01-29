import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import TargetCard from "./targetCard";

type TargetItem = {
  index: string;
  title: React.ReactElement;
  description: React.ReactElement;
};

const heading = <Translate>Наша цель</Translate>;
const TargetsList: TargetItem[] = [
  {
    index: '01',
    title: <Translate>Быстродействие</Translate>,
    description: <Translate>Мы хотим ускорить процесс разработки и выход на Time-to-Market.</Translate>
  },
  {
    index: '02',
    title: <Translate>Простота использования</Translate>,
    description: <Translate>Чем проще использовать инструмент, тем лучше конечный продукт.</Translate>
  },
  {
    index: '03',
    title: <Translate>Эффективное обновление UI</Translate>,
    description: <Translate>Обновлять интерфейс приложения без обновления самого приложения.</Translate>
  }
];


export default function TargetsSection(): JSX.Element {
  return (
    <div className="container">
      <Heading as="h2" className={styles.heading}>
        {heading}
      </Heading>
      <div className={`row ${styles.row}`}>
        {TargetsList.map((props, idx) => (
              <TargetCard key={idx} {...props} />
            ))}
      </div>
    </div>
  );
}
