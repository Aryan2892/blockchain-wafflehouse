import styles from '../styles/Home.module.css'

export default function Links() {
  return (
    /* should this be a button rather than div?  Does this affect accessibility/screen readers? */
    <div className={styles.grid}>
      <a
        href="https://developers.flow.com/tools/fcl-js/tutorials/flow-app-quickstart"
        target="_blank"
        rel="noreferrer"
        className={styles.card}>
          {/* connect logic to this button */}
        <h2>Log In With Wallet</h2>
      </a>
    </div>
  )
}
