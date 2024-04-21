import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Apply styles using className */}
      Blockchain Wafflehouse &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
