import './index.css'
import {Component} from 'react'

import {Link} from 'react-router-dom'

import {SiYoutubegaming} from 'react-icons/si'
import {AiFillHome} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import {FaFire} from 'react-icons/fa'

import ThemeContext from '../../context/ThemeContext'

class LeftNavbar extends Component {
  renderDesktopNavItems = isDark => {
    const navItemListContainer = isDark
      ? 'left-nav-items-list-container'
      : 'left-nav-items-list-container'

    return (
      <ul className={navItemListContainer}>
        <Link to="/" className="left-nav-link">
          <button
            id="home"
            type="button"
            className="left-nav-button"
            onClick={this.onClickNavHomeLink}
          >
            <li className="left-nav-item-container">
              <AiFillHome size={20} className="left-icon" />
              <p className="left-nav-item">Home</p>
            </li>
          </button>
        </Link>
        <Link to="/trending" className="left-nav-link">
          <button
            value="trending"
            type="button"
            className="left-nav-button"
            onClick={this.onClickNavTrendingLink}
          >
            <li className="left-nav-item-container">
              <FaFire size={20} className="left-icon" />
              <p className="left-nav-item">Trending</p>
            </li>
          </button>
        </Link>
        <Link to="/gaming" className="left-nav-link">
          <button
            type="button"
            className="left-nav-button"
            onClick={this.onClickNavGamingLink}
          >
            <li className="left-nav-item-container">
              <SiYoutubegaming size={20} className="left-icon" />
              <p className="left-nav-item">Gaming</p>
            </li>
          </button>
        </Link>
        <Link to="/saved-videos" className="left-nav-link">
          <button
            type="button"
            className="left-nav-button"
            onClick={this.onClickSavedVideos}
          >
            <li className="left-nav-item-container">
              <BiListPlus size={23} className="left-icon" />
              <p className="left-nav-item">Saved videos</p>
            </li>
          </button>
        </Link>
      </ul>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const leftNavAppContainer = isDark
            ? 'left-nav-app-container left-nav-app-dark'
            : 'left-nav-app-container'

          const contactUsHeadingClassName = isDark
            ? 'contact-us-heading nav-heading-dark'
            : 'contact-us-heading'
          const enjoyClassName = isDark
            ? 'enjoy-paragraph enjoy-dark'
            : 'enjoy-paragraph'
          return (
            <div className={leftNavAppContainer}>
              {this.renderDesktopNavItems(isDark)}
              <div className="contact-us-container">
                <p className={contactUsHeadingClassName}>CONTACT US</p>
                <div className="contact-us-icons">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="contact-us-image"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="contact-us-image"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="contact-us-image"
                  />
                </div>
                <p className={enjoyClassName}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LeftNavbar
