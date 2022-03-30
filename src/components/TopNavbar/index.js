import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {SiYoutubegaming} from 'react-icons/si'
import {FaMoon, FaFire} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import LogoutPopUp from '../LogoutPopUp'

import ThemeContext from '../../context/ThemeContext'

class TopNavbar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDark,
            changeTheme,
            isHamburgerActive,
            changeHamburgerActive,
          } = value

          this.renderMobileNavIcon = () => {
            const navItem = isDark ? 'nav-item nav-item-dark' : 'nav-item'

            return (
              <ul className="nav-icons-container">
                <Link to="/" className="nav-link">
                  <li>
                    <AiFillHome size={30} className={navItem} />
                  </li>
                </Link>
                <Link to="/trending" className="nav-link">
                  <li>
                    <FaFire size={30} className={navItem} />
                  </li>
                </Link>
                <Link to="/gaming" className="nav-link">
                  <li>
                    <SiYoutubegaming size={30} className={navItem} />
                  </li>
                </Link>
                <Link to="/saved-videos" className="nav-link">
                  <li>
                    <BiListPlus size={30} className={navItem} />
                  </li>
                </Link>
              </ul>
            )
          }
          this.onClickHamburger = () => {
            changeHamburgerActive()
          }
          this.onChangeThemeColor = () => {
            changeTheme()
          }

          this.onClickLogout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }

          const navClassName = isDark
            ? 'top-nav-content top-nav-content-dark'
            : 'top-nav-content'

          const websiteLogo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const changeThemeIcon = isDark ? (
            <FiSun size={25} className="sun-icon" />
          ) : (
            <FaMoon size={25} />
          )

          const hamburgerButton = isDark
            ? 'hamburger-button hamburger-dark'
            : 'hamburger-button'

          return (
            <nav className={navClassName}>
              <div className="top-nav-responsive-container">
                <Link to="/">
                  <img
                    alt="website logo"
                    src={websiteLogo}
                    className="nav-website-logo"
                  />
                </Link>
                <div className="nav-item-container">
                  <button
                    type="button"
                    data-testid="theme"
                    className="theme-button"
                    onClick={this.onChangeThemeColor}
                  >
                    {changeThemeIcon}
                  </button>
                  <img
                    alt="profile"
                    className="profile-image"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                  />
                  <button
                    type="button"
                    className={hamburgerButton}
                    onClick={this.onClickHamburger}
                  >
                    <GiHamburgerMenu className="ham-nav-item" />
                  </button>

                  <LogoutPopUp onClickLogout={this.onClickLogout} />
                </div>
              </div>
              {isHamburgerActive && this.renderMobileNavIcon()}
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(TopNavbar)
