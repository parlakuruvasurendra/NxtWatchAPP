import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {ButtonElement} from './StyledIndex'

class LoginFormComponent extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    passwordShowing: false,
    showError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMsg: errorMessage, showError: true})
  }

  getUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(JSON.stringify(userDetails))
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

  showingPassword = () => {
    this.setState(prevState => ({
      passwordShowing: !prevState.passwordShowing,
    }))
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderingUsernameField = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username" className="usernameLabel">
          Username
        </label>

        <input
          type="text"
          id="username"
          className="inputElement"
          onChange={this.changeUsername}
          value={username}
        />
      </div>
    )
  }

  renderingPasswordField = () => {
    const {password, passwordShowing} = this.state
    return (
      <div>
        <label htmlFor="password" className="usernameLabel">
          password
        </label>
        {passwordShowing ? (
          <input
            type="text"
            id="password"
            className="inputElement"
            onChange={this.changePassword}
            value={password}
          />
        ) : (
          <input
            type="password"
            id="password"
            className="inputElement"
            onChange={this.changePassword}
            value={password}
          />
        )}
      </div>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginContainer">
        <form className="formContainer" onSubmit={this.getUserDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="NxtWatch"
          />
          <div>{this.renderingUsernameField()}</div>
          <div>{this.renderingPasswordField()}</div>
          <div className="checkBoxAndLabelContainer">
            <input
              type="checkbox"
              id="showPassword"
              className="checkBox"
              onClick={this.showingPassword}
            />
            <label htmlFor="showPassword" className="checkBoxElement">
              Show Password
            </label>
          </div>
          <ButtonElement type="submit">Login</ButtonElement>

          {showError ? (
            <p className="errorMessageStyling">*{errorMsg}</p>
          ) : null}
        </form>
      </div>
    )
  }
}

export default LoginFormComponent
