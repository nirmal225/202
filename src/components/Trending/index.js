import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {FaFire} from 'react-icons/fa'
import {IconContainer, TrendingHeading} from './styledComponents'
import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'
import TrendingVideoItem from '../TrendingVideoItem'

import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {videosDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVideosDetails()
  }

  getFormattedVideoData = dataObject => ({
    id: dataObject.id,
    channel: {
      name: dataObject.channel.name,
      profileImageUrl: dataObject.channel.profile_image_url,
    },
    publishedAt: dataObject.published_at,
    thumbnailUrl: dataObject.thumbnail_url,
    title: dataObject.title,
    viewCount: dataObject.view_count,
  })

  getVideosDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const homeVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'Get',
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = await data.videos.map(eachVideo =>
        this.getFormattedVideoData(eachVideo),
      )
      this.setState({
        videosDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVideosField = isDark => {
    const {videosDetails} = this.state

    return (
      <ul className="trending-videos-list-container">
        {videosDetails.map(eachVideo => (
          <TrendingVideoItem
            videoDetails={eachVideo}
            key={eachVideo.id}
            isDark={isDark}
          />
        ))}
      </ul>
    )
  }

  onClickRetryButton = () => {
    this.getVideosDetails()
  }

  renderFailureView = isDark => {
    const failureImage = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    const homeFailureHeading = isDark
      ? 'home-failure-heading home-failure-dark'
      : 'home-failure-heading'

    const homeFailureParagraph = isDark
      ? 'home-failure-paragraph home-failure-paragraph-dark'
      : 'home-failure-paragraph'
    return (
      <div className="home-failure-container">
        <img
          src={failureImage}
          alt="failure view"
          className="home-failure-image"
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

  renderLoadingView = () => (
    <div data-testid="loader" className="trending-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderApiStatus = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
      case apiStatusConstants.success:
        return this.renderVideosField(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const trendingVideosContainer = isDark
            ? 'trending-videos-container trending-videos-container-dark'
            : 'trending-videos-container'
          const trendingVideos = isDark
            ? 'trending-videos trending-videos-dark'
            : 'trending-videos'
          return (
            <div className="trending-app-container" data-testid="trending">
              <TopNavbar />
              <div className="app-container">
                <LeftNavbar />
                <div className={trendingVideosContainer}>
                  <div className={trendingVideos}>
                    <IconContainer dark={isDark && true}>
                      <FaFire size={40} />
                    </IconContainer>
                    <TrendingHeading dark={isDark && true}>
                      Trending
                    </TrendingHeading>
                  </div>
                  {this.renderApiStatus(isDark)}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
