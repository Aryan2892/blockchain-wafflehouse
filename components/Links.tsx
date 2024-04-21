import * as React from 'react';
import * as fcl from '@onflow/fcl';
import styles from '../styles/Home.module.css';
import elementStyles from '../styles/Elements.module.css';

export default function Links() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Check if the user is already logged in when the component mounts
    fcl.currentUser().subscribe(user => {
      setIsLoggedIn(user.loggedIn);
    });
  }, []);

  const handleLogin = () => {
    fcl.authenticate();
  };

  const handleLogout = () => {
    fcl.unauthenticate();
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.grid}>
      {isLoggedIn ? (
        <button onClick={handleLogout} className={elementStyles.button}>
          Log Out
        </button>
      ) : (
        <button onClick={handleLogin} className={elementStyles.button}>
          Log In With Wallet
        </button>
      )}
    </div>
  );
}
