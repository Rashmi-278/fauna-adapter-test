import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import federatedLogout from '../pages/api/auth/fed-logout'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.



 async function federatedLogout(req, res) {
  try {
    
    

    const endsessionURL = `https://${process.env.COGNITO_DOMAIN}/logout?&client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_URL}`
   
    return res.redirect(`${endsessionURL}`)
  } catch (error) {

    console.log(error)
    res.redirect(process.env.NEXTAUTH_URL)
  }
}   
export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn("cognito")
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  
                  signOut()
                  //federatedLogout()
                  
                  console.log("signed out")
                }}
              >
                Sign out
              </a>
              {/* <a
                href={`/api/auth/logout`}
                className={styles.button}
              >
                Sign out
              </a> */}

              {/* <button  
              className={styles.button}
              onClick={() => window.location.href = "/api/auth/logout"}>
              Sign out
              </button> */}
          </>}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
          <li className={styles.navItem}><Link href="/client"><a>Client</a></Link></li>
          <li className={styles.navItem}><Link href="/server"><a>Server</a></Link></li>
          <li className={styles.navItem}><Link href="/protected"><a>Protected</a></Link></li>
          <li className={styles.navItem}><Link href="/api-example"><a>API</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}
