import React from 'react';

import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

function Footer(): JSX.Element | null {
  return (
    <div className={styles.footer_cont}>
      <div className={styles.direction}>
        <h3 className={styles.heading}>Duit</h3>
        <p className={styles.txt}>© {new Date().getFullYear()}</p>
        <Link className={styles.link} to="/docs/intro"><Translate>footer_docs</Translate></Link>
      </div>
    </div>
  );
}

export default React.memo(Footer);
