import jwt from "next-auth/jwt" 
//import log from "utils/server-logger"

export default async function federatedLogout(req, res) {
  try {
   

    const endsessionURL = `https://${process.env.COGNITO_DOMAIN}/logout?&client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_URL}`
    
    return res.redirect(`${endsessionURL}`)
  } catch (error) {
    
    console.log(error)
    res.redirect(process.env.NEXTAUTH_URL)
  }
}