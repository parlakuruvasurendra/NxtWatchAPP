import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import Loader from 'react-loader-spinner'
import VideoCardsComponent from '../VideoCardsComponent'
import {
  DivContainerElement,
  BannerHeading,
  ButtonElement,
  CloseButtonElement,
  HomeElement,
} from './StyledIndex'
import AllFeaturesComponent from '../AllFeaturesComponent'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    videosData: [],
    bannerView: true,
  }

  componentDidMount() {
    this.getVideosFromApiUrl()
  }

  getVideosFromApiUrl = async () => {
    const {searchInput} = this.state

    this.setState({apiStatus: apiStatusConstants.inprogress})

    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.videos.map(eachVideoItem => ({
        id: eachVideoItem.id,
        name: eachVideoItem.channel.name,
        profileImageUrl: eachVideoItem.channel.profile_image_url,
        publishedAt: eachVideoItem.published_at,
        thumbnailUrl: eachVideoItem.thumbnail_url,
        title: eachVideoItem.title,
        viewCount: eachVideoItem.view_count,
      }))
      this.setState({
        videosData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderingSuccessView = () => {
    const {videosData} = this.state
    const lengthOfVideosData = videosData.length
    return (
      <div className="videosContainer">
        {lengthOfVideosData > 0 ? (
          <ul className="homeUlContainer">
            {videosData.map(eachVideoCardItem => (
              <VideoCardsComponent
                passingVideosData={eachVideoCardItem}
                key={eachVideoCardItem.id}
              />
            ))}
          </ul>
        ) : (
          <div className="noSearchContainer">
            <div className="noSearchContainer1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
                className="noVideosImageStyling"
              />
              <h1 className="noResultsHeading">No Search Results Found</h1>
              <p className="noResultsParagraph">
                Try different key words or remove search filter
              </p>

              <button
                type="button"
                className="retryButtonStyling"
                onClick={this.getVideosFromApiUrl}
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  filteringVideos = () => {
    const {videosData, searchInput} = this.state
    const passingFilteredVideos = videosData.filter(eachFilteringItem =>
      eachFilteringItem.name.includes(searchInput),
    )
    this.setState({videosData: passingFilteredVideos})
  }

  onSearchingVideo = event => {
    this.setState({searchInput: event.target.value})
  }

  renderingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderingFailureView = () => (
    <div className="failureContainer2">
      <div className="failureContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="failureImageStyling"
        />
        <h1 className="failureHeading">Oops! Something Went Wrong</h1>
        <p className="failureParagraph">We are having some trouble</p>
        <button
          type="button"
          className="retryButtonStyling"
          onClick={this.getVideosFromApiUrl}
        >
          Retry
        </button>
      </div>
    </div>
  )

  closedBanner = () => {
    this.setState(prevState => ({
      bannerView: !prevState.bannerView,
    }))
  }

  renderingFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingSuccessView()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      case apiStatusConstants.inprogress:
        return this.renderingLoadingView()
      default:
        return null
    }
  }

  render() {
    const {bannerView} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="homeContainer">
          <div className="removingContainer">
            <AllFeaturesComponent />
          </div>
          <div className="beforeInnerContainer" data-testid="home">
            {bannerView ? (
              <DivContainerElement data-testid="banner">
                <HomeElement>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="nxtBannerLogo"
                  />
                  <CloseButtonElement data-testid="close">
                    <AiOutlineClose
                      className="closeIcon"
                      onClick={this.closedBanner}
                    />
                  </CloseButtonElement>
                </HomeElement>
                <BannerHeading>Buy Nxt Watch Premium</BannerHeading>
                <ButtonElement>GET IT NOW</ButtonElement>
              </DivContainerElement>
            ) : null}
            <div className="inputAndSearchContainer">
              <input
                type="Search"
                className="inputElement"
                placeholder="Search a video"
                onChange={this.onSearchingVideo}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.filteringVideos}
              >
                <AiOutlineSearch className="searchIconStyling" />
              </button>
            </div>

            {this.renderingFinalView()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
