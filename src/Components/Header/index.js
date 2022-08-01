import './index.css'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'

import {HiMenu} from 'react-icons/hi'

import Popup from 'reactjs-popup'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navContainer">
      <Link to="/" className="removingLinkingStyles">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="nxtWatchLogoStyling"
        />
      </Link>

      <div className="moonProfileAndLogoutContainer">
        <button type="button" className="moonButtonStyling" data-testid="theme">
          <FaMoon className="moonIconStyling" />
        </button>
        <HiMenu className="profileMenuIconStyling" />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profileImageStyling"
        />
        <Popup
          modal
          trigger={
            <button type="button" className="logoutButtonStyling">
              Logout
            </button>
          }
        >
          {close => (
            <>
              <div className="popUpContainer">
                <p className="logoutParagraph">
                  Are you sure, you want to logout
                </p>
                <div className="buttonsContainer">
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="triggering"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
