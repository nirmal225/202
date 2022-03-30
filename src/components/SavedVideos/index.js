import './index.css'
import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'

import {IconContainer} from './styledComponents'

import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'
import SavedVideoCard from '../SavedVideoCard'

import ThemeContext from '../../context/ThemeContext'

class SavedVideos extends Component {
  renderVideosView = (isDark, savedVideos) => {
    const trendingVideos = isDark
      ? 'trending-videos trending-videos-dark'
      : 'trending-videos'

    const savedVideosHeading = isDark
      ? 'saved-videos-heading saved-videos-heading-dark '
      : 'saved-videos-heading '

    return (
      <div>
        <div className={trendingVideos}>
          <IconContainer dark={isDark && true}>
            <BiListPlus size={40} />
          </IconContainer>
          <h1 className={savedVideosHeading}>Saved Videos</h1>
        </div>
        <ul className="saved-videos-list-container">
          {savedVideos.map(eachVideo => (
            <SavedVideoCard
              videoDetails={eachVideo}
              key={eachVideo.id}
              isDark={isDark}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderNoVideosView = isDark => {
    const noSavedVideosHeading = isDark
      ? 'no-saved-videos-heading no-saved-videos-heading-dark'
      : 'no-saved-videos-heading'
    const noSavedVideosParagraph = isDark
      ? 'no-saved-videos-paragraph no-saved-videos-heading-dark'
      : 'no-saved-videos-paragraph'
    return (
      <div className="no-videos-container" data-testid="savedVideos">
        <img
          alt="no saved videos"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          className="no-saved-videos-image"
        />
        <h1 className={noSavedVideosHeading}>No saved videos found</h1>
        <p className={noSavedVideosParagraph}>
          You can save your videos while watching them
        </p>
      </div>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, savedVideos} = value
          console.log(savedVideos)
          const savedVideosContainer = isDark
            ? 'saved-videos-container saved-video-container-dark'
            : 'saved-videos-container'
          return (
            <div className="saved-video-app-container">
              <TopNavbar />
              <div className="app-container">
                <LeftNavbar />
                <div className={savedVideosContainer}>
                  {savedVideos.length === 0
                    ? this.renderNoVideosView(isDark)
                    : this.renderVideosView(isDark, savedVideos)}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
