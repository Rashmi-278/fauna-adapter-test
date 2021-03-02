// /api/auth/federated-logout
import jwt from "next-auth/jwt"
import log from "utils/server-logger"

export default async function federatedLogout(req, res) {
  try {
    if(req.method === 'GET') {

    const token = await jwt.getToken({req, secret: process.env.SECRET, encryption: true })
    if (!token) {
      log.warn("No JWT token found when calling /federated-logout endpoint")
      return res.redirect(process.env.NEXTAUTH_URL)
    }
    if (!token.idToken)
     log.warn("Without an id_token the user won't be redirected back from the IdP after logout.")

    const endsessionURL = `https://${process.env.COGNITO_DOMAIN}/logout?client_id=${process.env.COGNITO_CLIENT_ID}`
    const endsessionParams = new URLSearchParams({
      id_token_hint: token.idToken,
      post_logout_redirect_uri: process.env.NEXTAUTH_URL,
    })
    return res.redirect(`${endsessionURL}?${endsessionParams}`)
    
    }
  } catch (error) {
    log.error(error)
    res.redirect(process.env.NEXTAUTH_URL)
  }
}