import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Chat from "./Chat";
import Translate from "@docusaurus/Translate";

export default function PromoSection(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div className={`${styles.title} col`}>
            <Heading as="h1" className={styles.heading}>
              <Translate>promo.your</Translate> 
              <span className={styles.yellow}>
                <Translate>promo.app</Translate>
              </span> 
              <Translate>promo.on_server</Translate>
            </Heading>
            <p>
              <Translate>promo.description</Translate>
            </p>
          </div>
          <div className="col">
            <Chat />
          </div>
        </div>
      </div>
    </section>
  );
}
