import React from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Footer(): JSX.Element | null {
  const {i18n} = useDocusaurusContext();

  return (
    <div className={styles.footer_cont}>
      <div className={styles.direction}>
        <h3 className={styles.heading}>DUIT</h3>
        <p className={styles.txt}>© {new Date().getFullYear()}</p>
        <Link className={styles.link} to="/about">{i18n.currentLocale == "en" ? "About" : "О проекте"}</Link>
        <Link className={styles.link} to="/docs/intro">{i18n.currentLocale == "en" ? "Docs" : "Документация"}</Link>
      </div>
    </div>
  );
}

export default React.memo(Footer);
