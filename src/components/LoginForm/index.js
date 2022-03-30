import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderShowPasswordField = isDark => {
    const {showPassword} = this.state
    console.log(showPassword)
    const showPasswordClassname = isDark
      ? 'show-password show-password-dark'
      : 'show-password'

    return (
      <div className="show-password-container">
        <input
          type="checkbox"
          id="show-password"
          checked={showPassword}
          className="show-password-input"
          onChange={this.onClickShowPassword}
        />
        <label htmlFor="show-password" className={showPasswordClassname}>
          Show Password
        </label>
      </div>
    )
  }

  renderPasswordField = isDark => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'

    const inputLabel = isDark ? 'input-label input-dark' : 'input-label'
    const inputUserClassName = isDark
      ? 'username-input-field input-field-dark'
      : 'username-input-field'
    return (
      <>
        <label className={inputLabel} htmlFor="password">
          PASSWORD
        </label>
        <input
          type={inputType}
          id="password"
          placeholder="Password"
          className={inputUserClassName}
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = isDark => {
    const {username} = this.state

    const inputLabel = isDark ? 'input-label input-dark' : 'input-label'
    const inputUserClassName = isDark
      ? 'username-input-field input-field-dark'
      : 'username-input-field'
    return (
      <>
        <label className={inputLabel} htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className={inputUserClassName}
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const appContainer = isDark
            ? 'login-app-container login-app-dark'
            : 'login-app-container'
          const loginContainer = isDark
            ? 'login-container login-dark'
            : 'login-container'
          const websiteLogo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const token = Cookies.get('jwt_token')
          if (token !== undefined) {
            return <Redirect to="/" />
          }
          return (
            <div className={appContainer}>
              <div className={loginContainer}>
                <img
                  alt="website logo"
                  className="website-logo"
                  src={websiteLogo}
                />
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  {this.renderUsernameField(isDark)}
                  {this.renderPasswordField(isDark)}
                  {this.renderShowPasswordField(isDark)}
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showSubmitError && <p>{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
