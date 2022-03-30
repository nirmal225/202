import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import ThemeContext from '../../context/ThemeContext'
import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    isSaved: false,
    isLikeActive: false,
    isDisLikeActive: false,
    videoData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoData()
  }

  onClickRetryButton = () => {
    this.getVideoData()
  }

  getFormattedVideoData = dataObject => ({
    channel: {
      name: dataObject.channel.name,
      profileImageUrl: dataObject.channel.profile_image_url,
      subscriberCount: dataObject.channel.subscriber_count,
    },
    description: dataObject.description,
    publishedAt: dataObject.published_at,
    thumbnailUrl: dataObject.thumbnail_url,
    title: dataObject.title,
    viewCount: dataObject.view_count,
    videoUrl: dataObject.video_url,
  })

  getVideoData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'Get',
    }

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedVideoData(data.video_details)
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = isDark => {
    const failureImage = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    const homeFailureHeading = isDark
      ? 'video-details-failure-heading video-details-failure-dark'
      : 'video-details-failure-heading'

    const homeFailureParagraph = isDark
      ? 'video-details-failure-paragraph video-details-failure-paragraph-dark'
      : 'video-details-failure-paragraph'
    return (
      <div className="video-details-failure-container">
        <img
          src={failureImage}
          alt="failure view"
          className="video-details-failure-image"
        />
        <h1 className={homeFailureHeading}>OOps! Something Went Wrong</h1>
        <p className={homeFailureParagraph}>
          We are having some trouble to complete your request. Please try again
        </p>
        <button
          type="button"
          onClick={this.onClickRetryButton}
          className="home-retry-button"
        >
          Retry
        </button>
      </div>
    )
  }

  onClickLikeButton = () => {
    const {isDisLikeActive} = this.state
    if (isDisLikeActive === true) {
      this.setState({
        isDisLikeActive: false,
      })
    }
    this.setState({
      isLikeActive: true,
    })
  }

  onClickDislikeButton = () => {
    const {isLikeActive} = this.state
    if (isLikeActive === true) {
      this.setState({
        isLikeActive: false,
      })
    }
    this.setState({
      isDisLikeActive: true,
    })
  }

  renderVideoField = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, addSavedVideo} = value
        const {videoData} = this.state
        const {
          channel,
          description,
          publishedAt,
          title,
          viewCount,
          videoUrl,
        } = videoData
        const {name, profileImageUrl, subscriberCount} = channel
        const {isLikeActive, isDisLikeActive, isSaved} = this.state

        const videoDetailsContainer = isDark
          ? 'video-details-container video-details-dark'
          : 'video-details-container'
        const videoDetailsTitle = isDark
          ? 'video-details-title video-details-title-dark'
          : 'video-details-title'
        const viewsTimeItemsContainer = isDark
          ? 'views-time-items-container views-time-item-dark'
          : 'views-time-items-container'
        const likeContainer = isLikeActive
          ? 'like-container is-active'
          : 'like-container'
        const disLikeContainer = isDisLikeActive
          ? 'dislike-container is-active'
          : 'dislike-container'
        const channelName = isDark
          ? 'channel-name channel-dark'
          : 'channel-name'
        const saveContainer = isSaved
          ? 'save-container is-active'
          : 'save-container'
        const saveButtonContent = isSaved ? 'Saved' : 'Save'
        const subscriberCountClassName = isDark
          ? 'subscriber-count subscriber-dark'
          : 'subscriber-count'
        const videoDescription = isDark
          ? 'video-description video-description-dark'
          : 'video-description'

        const onAddSavedVideo = () => {
          this.setState(prevState => ({
            isSaved: !prevState.isSaved,
          }))
          addSavedVideo(videoData)
        }

        return (
          <div className={videoDetailsContainer}>
            <div className="player-container">
              <ReactPlayer url={videoUrl} width="react-player" controls />
            </div>
            <p className={videoDetailsTitle}>{title}</p>
            <div className={viewsTimeItemsContainer}>
              <div className="views-time-container">
                <p className="viewsCount">{viewCount} views</p>
                <p>{publishedAt}</p>
              </div>
              <div className="like-dislike-videos-container">
                <button
                  type="button"
                  className={likeContainer}
                  onClick={this.onClickLikeButton}
                >
                  <BiLike size={25} className="like-image" />
                  Like
                </button>
                <button
                  type="button"
                  className={disLikeContainer}
                  onClick={this.onClickDislikeButton}
                >
                  <BiDislike size={25} className="like-image" />
                  Dislike
                </button>
                <button
                  type="button"
                  className={saveContainer}
                  onClick={onAddSavedVideo}
                >
                  {saveButtonContent}
                </button>
              </div>
            </div>
            <hr className="line" />
            <div className="profile-name-description-container">
              <img
                alt="channel logo"
                src={profileImageUrl}
                className="video-profile-image"
              />
              <div className="name-subscribers-description-container">
                <p className={channelName}>{name}</p>
                <p className={subscriberCountClassName}>
                  {subscriberCount}K subscribers
                </p>
                <p className={videoDescription}>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderApiStatusViews = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVideoField(isDark)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const videoDetailsAppClassName = isDark
            ? 'video-details-app-container video-details-app-dark'
            : 'video-details-app-container'

          return (
            <div
              data-testid="videoItemDetails"
              className={videoDetailsAppClassName}
            >
              <TopNavbar />
              <div className="app-container">
                <LeftNavbar />
                {this.renderApiStatusViews(isDark)}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
