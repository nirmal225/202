import './index.css'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {IconContainer, TrendingHeading} from './styledComponents'

import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'
import GamingVideoCard from '../GamingVideoCard'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gameVideosDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamesDetails()
  }

  getFormattedVideoData = dataObject => ({
    id: dataObject.id,
    thumbnailUrl: dataObject.thumbnail_url,
    title: dataObject.title,
    viewCount: dataObject.view_count,
  })

  getGamesDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'Get',
    }
    const response = await fetch(gamingVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = await data.videos.map(eachVideo =>
        this.getFormattedVideoData(eachVideo),
      )
      this.setState({
        gameVideosDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = isDark => {
    const {gameVideosDetails} = this.state
    const gamingIconContainer = isDark
      ? 'trending-icon-container gaming-icon-dark'
      : 'trending-icon-container'

    return (
      <div className="game-video-details-container">
        <div className={gamingIconContainer}>
          <IconContainer dark={isDark && true}>
            <SiYoutubegaming size={40} />
          </IconContainer>
          <TrendingHeading dark={isDark && true}>Gaming</TrendingHeading>
        </div>
        <ul className="list-container">
          {gameVideosDetails.map(eachGame => (
            <GamingVideoCard
              videoDetails={eachGame}
              key={eachGame.id}
              isDark={isDark}
            />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getGamesDetails()
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
    <div data-testid="loader" className="gaming-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderApiStatusViews = isDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
      case apiStatusConstants.success:
        return this.renderSuccessView(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const gamingContainer = isDark
            ? 'gaming-video-app-container gaming-dark'
            : 'gaming-video-app-container'
          return (
            <div data-testid="gaming" className={gamingContainer}>
              <TopNavbar />
              <div className="app-container">
                <LeftNavbar />
                <div className="gaming-videos-container">
                  {this.renderApiStatusViews(isDark)}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
