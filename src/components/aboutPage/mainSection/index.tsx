import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

const aboutTitle = <Translate>О проекте</Translate>;
const aboutDescription = (
  <Translate>
    это активно развивающаяся экосистема open source библиотек и инструментов,
    призванная помочь разработчикам легко и эффективно реализовывать подход
    backend-driven UI в своих приложениях, написанных на Flutter.
  </Translate>
);

export default function MainSection(): JSX.Element {
  return (
    <div className="container">
      <Heading className={styles.title} as={"h3"}>
        {aboutTitle}
      </Heading>
      <p className={styles.description}>
        <span className={styles.span}>Duit</span> - {aboutDescription}
      </p>
    </div>
  );
}
