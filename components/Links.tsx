import * as fcl from '@onflow/fcl'
import styles from '../styles/Home.module.css'
import elementStyles from '../styles/Elements.module.css'

export default function Links() {
  const handleLogin = () => {
    fcl.authenticate()
  }

  return (
    <div className={styles.grid}>
      <button
        onClick={handleLogin}
        className={elementStyles.button}>
        Log In With Wallet
      </button>
    </div>
  )
}
// the css for this page has changed.  likely due to button element rather than anchor element and
//  nesting/descendent changes.

// also omit logic and actual button from nav
