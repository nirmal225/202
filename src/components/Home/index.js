import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdClose} from 'react-icons/md'
import {FiSearch} from 'react-icons/fi'
import TopNavbar from '../TopNavbar'
import LeftNavbar from '../LeftNavbar'
import VideoItemCard from '../VideoItemCard'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    isBannerActive: true,
    videosDetails: [],
  }

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
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getVideosDetails()
    }
  }

  onClickCancel = () => {
    this.setState({
      isBannerActive: false,
    })
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
        <h1 className={homeFailureHeading}>Oops! Something Went Wrong</h1>
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

  onClickSearchButton = () => {
    this.getVideosDetails()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderNoVideosView = isDark => {
    const homeFailureHeading = isDark
      ? 'home-failure-heading home-failure-dark'
      : 'home-failure-heading'

    const homeFailureParagraph = isDark
      ? 'home-failure-paragraph home-failure-paragraph-dark'
      : 'home-failure-paragraph'
    return (
      <div className="home-failure-container">
        <img
          alt="no videos"
          className="home-failure-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        />
        <h1 className={homeFailureHeading}>No Search results found</h1>
        <p className={homeFailureParagraph}>
          Try different key words or remove search filter
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

  renderVideosField = isDark => {
    const {videosDetails} = this.state
    const isCountGreaterThanOne = videosDetails.length > 1
    return isCountGreaterThanOne ? (
      <ul className="youtube-videos-container">
        {videosDetails.map(eachVideo => (
          <VideoItemCard
            videoDetails={eachVideo}
            key={eachVideo.id}
            isDark={isDark}
          />
        ))}
      </ul>
    ) : (
      this.renderNoVideosView(isDark)
    )
  }

  renderSearchField = isDark => {
    const {searchInput} = this.state
    const searchContainer = isDark
      ? 'search-container search-dark'
      : 'search-container'
    const searchButton = isDark
      ? 'search-button search-button-dark'
      : 'search-button'

    return (
      <div className={searchContainer}>
        <input
          type="search"
          testid="search"
          value={searchInput}
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className={searchButton}
          onClick={this.onClickSearchButton}
          data-testid="searchButton"
        >
          <FiSearch />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderBackGroundBanner = () => {
    const {isBannerActive} = this.state

    return isBannerActive ? (
      <div className="banner-container" data-testid="banner">
        <div className="logo-close-container">
          <img
            alt="nxt watch logo"
            className="home-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <button
            type="button"
            data-testid="close"
            className="banner-close-button"
            onClick={this.onClickCancel}
          >
            <MdClose size={20} />
          </button>
        </div>
        <p className="banner-paragraph">Buy Nxt Watch Premium</p>
        <button type="button" className="get-it-now-button">
          GET IT NOW
        </button>
      </div>
    ) : null
  }

  renderApiStatusViews = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return (
          <>
            {this.renderSearchField(isDark)}
            {this.renderVideosField(isDark)}
          </>
        )
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
          const homeAppClassName = isDark
            ? 'home-app-container home-app-dark'
            : 'home-app-container'
          return (
            <div data-testid="home" className={homeAppClassName}>
              <TopNavbar />
              <div className="app-container">
                <LeftNavbar />
                <div className="home-container">
                  {this.renderBackGroundBanner()}
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
export default Home
