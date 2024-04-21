import useCurrentUser from '../hooks/useCurrentUser'
import navbarStyles from '../styles/Navbar.module.css'

export default function Navbar() {
  const user = useCurrentUser()

  return (
    <div className={navbarStyles.navbar}>
      {user.loggedIn && 
        (
          <>
            <div className={navbarStyles.address}>{ user?.addr }</div>
          </>
        )
      }
    </div>
  )
}
