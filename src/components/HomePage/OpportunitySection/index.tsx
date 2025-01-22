import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";
import Card4 from "./card4";
import Card5 from "./card5";
import Card6 from "./card6";

type FeatureItem = {
  bgColor: string;
  title: string;
  description: JSX.Element;
  Component?: () => JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    bgColor: "#EED6AA",
    title: "Гибкость в использовании",
    description: (
      <>
        Простая интеграция с существующим приложением и мощные возможности для
        изменения базового поведения.
      </>
    ),
    Component: Card1,
  },
  {
    bgColor: "#BFEFAF",
    title: "Действия и события",
    description: (
      <>
        Взаимодействуя с интерфейсом, пользователь вызывает действие, которое
        было описано на стороне сервера. В ответ на действие генерируйте
        множество событий, для описания нового состояния UI и поведения
        приложения.
      </>
    ),
    Component: Card2,
  },
  {
    bgColor: "#E1E2E9",
    title: "Компоненты Duit",
    description: (
      <>
        Инструмент шаблонизации, который позволяет создавать переиспользуемые
        композиции виджетов. Наполняйте их данными, повышайте читаемость кода и
        производительность системы.
      </>
    ),
    Component: Card3,
  },
  {
    bgColor: "#D0DCE1",
    title: "DSL для бэкэнда",
    description: (
      <>
        Экосистема библиотек для популярных в разработке языков: go и
        typescript. Наслаждайтесь привычной семантикой верстки и защититесь от
        ошибок при построении макетов.
      </>
    ),
    Component: Card4,
  },
  {
    bgColor: "#9DDBE7",
    title: "Пользовательские виджеты",
    description: (
      <>
        Делайте UI ярче, а разработку приятнее, интегрируя в Duit собственные
        конфигурации виджетов.
      </>
    ),
    Component: Card5,
  },
  {
    bgColor: "#EBE5E2",
    title: "Анимация",
    description: (
      <>
        Реализуйте анимации любой сложности в привычном ключе, достигая
        максимального контроля и производительности.
      </>
    ),
    Component: Card6,
  },
];

function FeatureCard({ bgColor, title, description, Component }: FeatureItem) {
  return (
    <div className={`${styles.card}`} style={{ backgroundColor: bgColor }}>
      <div>
        <div className="text--left padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
        <div className="text--center">
          <Component />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h1">Возможности Duit</Heading>
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
