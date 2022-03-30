import './index.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import ThemeContext from '../../context/ThemeContext'

const LogoutPopUp = props => {
  const {onClickLogout} = props

  const ClickLogout = () => {
    onClickLogout()
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        const logOutButtonClassName = isDark
          ? 'logout-button logout-dark'
          : 'logout-button'
        const popupLogoutContent = isDark
          ? 'popup-logout-content'
          : 'popup-logout-content'

        return (
          <Popup
            modal
            trigger={
              <button type="button" className={logOutButtonClassName}>
                Logout
              </button>
            }
            className="logout-popup-container"
          >
            {close => (
              <div className="buttons-content-container">
                <p className={popupLogoutContent}>
                  Are you sure, you want to logout
                </p>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="confirm-button"
                  onClick={ClickLogout}
                >
                  Confirm
                </button>
              </div>
            )}
          </Popup>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default LogoutPopUp
