import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import { Router, useRouter } from 'next/router'
import redirect from 'nextjs-redirect'
import {useState} from 'react';
import axios from 'axios';


const cognito = redirect('https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/')

export default function Header () {
  const [ session, loading ] = useSession()
  const router = useRouter();
  const [out , setSignout] = useState(false)

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
                href={'/api/auth/signout'}
                className={styles.button}
                onClick={ async(e) => {
                  e.preventDefault()
                  signOut()
                  // const nextauthdata = await signOut({redirect:false} )
                  // console.log("1")
                  // console.log(nextauthdata)


                  // const res = await axios.get(`https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/` , { headers: {"Access-Control-Allow-Origin": "*"} });
                  // console.log(res)
                  
                  // const { signoutdata, error } = useSWR('/api/auth/logout', fetcher)
                  // console.log(signoutdata)


                  

                  // fetch('https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/' , { 'method' : 'GET' , 'mode':'no-cors' , 'credentials': 'include'})
                  // .then(response => { console.log("2"); console.log(response) }) ;

                  
                  
                 // router.push('/redirect')                  

                  //const signoutdata  = await signOut({ callbackUrl: "/api/auth/logout"})        
                            
                  //router.push('https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/')                  
                } }
              >
                Sign out
              </a> */}


              <a
                href={`https://nextauth1.auth.ap-south-1.amazoncognito.com/logout?client_id=7agnle801a00muhiuvc26n6rfu&logout_uri=https://fauna-adapter-test.vercel.app/api/auth/signout`}
                className={styles.button}
              >
                Sign out
              </a>
{/* 
              <a
              href={'/api/auth/signout'}
              className={styles.button}
              onClick={(e) => {
                e.preventDefault()
                  signOut()
              }}             
              >
                signout
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
