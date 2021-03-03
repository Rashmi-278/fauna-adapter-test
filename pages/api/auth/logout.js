async function handleLogout(req, res) {
  console.log("in api/auth/logout");
  
  //res.redirect(`https://${process.env.COGNITO_DOMAIN}/logout?response_type=code&client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_URL}&redirect_uri=${process.env.COGNITO_DOMAIN}&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin`);

  res.redirect(`https://${process.env.COGNITO_DOMAIN}/logout?&client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_URL}`);

}

export default async function logout(req, res) {
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400 + "inside api endpoint ").end(error.message + "inside api endpoint ");
  }
}