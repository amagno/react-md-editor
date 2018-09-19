import React from 'react'
import { verifyIsLogged, logout } from '../Lib/github-auth'

const clientId = '37b7f18f970f2b8bb52e'
const redirectUri = 'http://localhost:4000/oauth/redirect'

class Login extends React.Component {
  handleLogin = async () => {
    const loginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl
  }
  handleLogout = () => {
    logout()
  }
  handleLoginSuccess = (response) => {
    console.log(response)
  }
  handleLoginFail = (response) => {
    console.log(response)
  }
  render() {
    return verifyIsLogged() ? (<button onClick={this.handleLogout}>LOGOUT</button>) : (<button onClick={this.handleLogin}>LOGIN</button>)
  }
}

export default Login