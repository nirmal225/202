import './index.css'
import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'
import ThemeContext from '../../context/ThemeContext'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value

      const notFoundAppContainer = isDark
        ? 'not-fond-video-app-container not-found-app-dark'
        : 'not-fond-video-app-container'
      const notFoundImage = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      const notFoundHeading = isDark
        ? 'not-found-heading not-found-heading-dark'
        : 'not-found-heading'

      const notFoundParagraph = isDark
        ? 'not-found-paragraph not-found-paragraph-dark'
        : 'not-found-paragraph'

      return (
        <div className={notFoundAppContainer}>
          <TopNavbar />
          <div className="app-container">
            <LeftNavbar />
            <div className="not-fond-videos-container">
              <img
                alt="not found"
                className="not-found-image"
                src={notFoundImage}
              />
              <h1 className={notFoundHeading}>Page Not Found</h1>
              <p className={notFoundParagraph}>
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
