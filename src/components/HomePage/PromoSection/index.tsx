import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Chat from "./Chat";
import Translate from "@docusaurus/Translate";

export default function PromoSection(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div className={`${styles.title} col col--7`}>
            <Heading as="h1" className={styles.heading}>
            <Translate>promo_p1</Translate>  {/** Ваше */}
            <span className={styles.yellow}>
              <Translate>promo_p2</Translate> {/** приложение */}
            </span>
            <Translate>promo_p3</Translate> {/**живет на сервере */}
            </Heading>
            
            <p className={styles.description}>
              {/**!SECTION
               * Вы определяете элементы, состояния и анимации на серверной
              стороне, и они отправляются клиенту независимо от версии
              приложения. Обновляйте UI приложения по мере необходимости — будь
              то каждый час или даже чаще.
               */}
              <Translate>promo_description</Translate>
            </p>
          </div>
          <div className="col col--5">
            <Chat />
          </div>
        </div>
      </div>
    </section>
  );
}
