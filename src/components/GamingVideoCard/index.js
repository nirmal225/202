import './index.css'
import {ViewsAndTimeContainer} from './styledComponents'

const GamingVideoCard = props => {
  const {isDark, videoDetails} = props
  const {title, thumbnailUrl, viewCount} = videoDetails
  const videoHeading = isDark
    ? 'game-heading game-heading-dark'
    : 'game-heading'

  return (
    <li className="gaming-list-container">
      <img
        alt="thumbnail"
        src={thumbnailUrl}
        className="gaming-thumbnail-image"
      />
      <div className="gaming-video-details-description-container">
        <h1 className={videoHeading}>{title}</h1>
        <p className="channel-name">{title}</p>
        <ViewsAndTimeContainer>
          <p className="view-count-content">{viewCount} Watching World Wide</p>
        </ViewsAndTimeContainer>
      </div>
    </li>
  )
}

export default GamingVideoCard
