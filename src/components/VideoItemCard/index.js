import './index.css'
import {Link} from 'react-router-dom'

const VideoItemCard = props => {
  const {videoDetails, isDark} = props
  const {
    id,
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  const {name, profileImageUrl} = channel

  const videoTitle = isDark
    ? 'video-description video-description-dark'
    : 'video-description'

  const nameClassName = isDark ? 'name views-count-dark' : 'name'

  const viewsCount = isDark ? 'views-count views-count-dark' : 'views-count'
  const publishedAtClassName = isDark
    ? 'published-at views-count-dark'
    : 'published-at'

  return (
    <Link to={`/videos/${id}`} className="video-item-container">
      <div className="video-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-image"
        />
        <div className="profile-and-video-description">
          <img
            alt="channel logo"
            src={profileImageUrl}
            className="video-profile-image"
          />
          <div className={videoTitle}>
            <p className="video-title">{title}</p>
            <p className={nameClassName}>{name}</p>
            <div className="count-time-container">
              <p className={viewsCount}>{viewCount} Views .</p>
              <p className={publishedAtClassName}> {publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoItemCard
