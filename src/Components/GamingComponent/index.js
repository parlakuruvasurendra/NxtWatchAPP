import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import GamingVideoCard from '../GamingVideoCard'

import Header from '../Header'

import AllFeaturesComponent from '../AllFeaturesComponent'

import {
  GamingFailureContainer,
  GamingFailureParagraph,
  GamingFailureButton,
  GamingFailureHeading,
} from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingComponent extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingVideosData: []}

  componentDidMount() {
    this.getGamingVideosFromApiUrl()
  }

  getGamingVideosFromApiUrl = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.videos.map(eachGamingVideoItem => ({
        id: eachGamingVideoItem.id,
        thumbnailUrl: eachGamingVideoItem.thumbnail_url,
        title: eachGamingVideoItem.title,
        viewCount: eachGamingVideoItem.view_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingVideosData: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderingLoadingView = () => (
    <div className="gaming-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderingGamingSuccessView = () => {
    const {gamingVideosData} = this.state
    return (
      <div className="gamingSuccessContainer">
        <nav className="gamingNavContainer">
          <div className="gamingIconContainer">
            <SiYoutubegaming className="gamingIconStyling" />
          </div>
          <h1 className="gamingHeading">Gaming</h1>
        </nav>
        <ul className="gamingUlContainer">
          {gamingVideosData.map(eachGamingItem => (
            <GamingVideoCard
              passingGamingVideoData={eachGamingItem}
              key={eachGamingItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderingGamingFailureView = () => (
    <GamingFailureContainer>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="gamingFailureImageStyling"
      />
      <GamingFailureHeading>Oops! Something Went Wrong</GamingFailureHeading>
      <GamingFailureParagraph>
        We are having some trouble
      </GamingFailureParagraph>
      <GamingFailureButton onClick={this.getGamingVideosFromApiUrl}>
        Retry
      </GamingFailureButton>
    </GamingFailureContainer>
  )

  renderingGamingFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingGamingSuccessView()
      case apiStatusConstants.failure:
        return this.renderingGamingFailureView()
      case apiStatusConstants.inprogress:
        return this.renderingLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="gamingFinalContainer">
          <div className="removedInGamingComponent">
            <AllFeaturesComponent />
          </div>
          {this.renderingGamingFinalView()}
        </div>
      </div>
    )
  }
}

export default GamingComponent
