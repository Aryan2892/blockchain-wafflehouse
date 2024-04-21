import * as React from 'react';
import * as fcl from '@onflow/fcl';
import navbarStyles from '../styles/Navbar.module.css';

export default function Navbar() {
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
    <div className={navbarStyles.navbar}>
      {isLoggedIn && (
        <button onClick={handleLogout} className={navbarStyles.button}>
          Log Out
        </button>
      )}
      {!isLoggedIn && (
        <button onClick={handleLogin} className={navbarStyles.button}>
          Log In With Wallet
        </button>
      )}
    </div>
  );
}
