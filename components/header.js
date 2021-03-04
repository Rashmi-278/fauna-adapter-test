import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import { Router, useRouter } from 'next/router'
// var XMLHttpRequest = require("xmlhttprequest");

// // The approach used in this component shows how to built a sign in and sign out
// // component that works on pages which support both client and server side
// // rendering, and avoids any flash incorrect content on initial page load.

// const Http = new XMLHttpRequest();
// const url='https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/';


// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
// }

  
export default function Header () {
  const [ session, loading ] = useSession()
  const router = useRouter()
  
  
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
            {/* <a
                className={styles.button}
                onClick={async(e) => {
                  e.preventDefault()

                  // Http.open("GET", url);
                  // Http.send();

                  const signoutdata = await fetch('/api/auth/logout')
                  console.log(signoutdata)

                  const nextauthdata = await signOut({redirect:false ,callbackUrl:"/"})
                  console.log(nextauthdata)
                  
                  //router.push('https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/')                  

                  //const signoutdata  = await signOut({ callbackUrl: "/api/auth/logout"})        
                            
                  //router.push('https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/')                  
                } }
              >
                Sign out
              </a> */}


              <a
                href={`/api/auth/logout`}
                className={styles.button}
              >
                Sign out
              </a>

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
