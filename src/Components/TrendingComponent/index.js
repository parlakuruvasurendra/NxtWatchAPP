import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import TrendingVideoCard from '../TrendingVideoCard'
import Header from '../Header'
import AllFeaturesComponent from '../AllFeaturesComponent'

import {
  TrendingFailureContainer,
  TrendingFailureHeading,
  TrendingFailureButton,
  TrendingFailureParagraph,
} from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingComponent extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingVideosListData: []}

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(trendingVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = data.videos.map(eachTrendingVideoItem => ({
        id: eachTrendingVideoItem.id,
        name: eachTrendingVideoItem.channel.name,
        profileImageUrl: eachTrendingVideoItem.channel.profile_image_url,
        publishedAt: eachTrendingVideoItem.published_at,
        thumbnailUrl: eachTrendingVideoItem.thumbnail_url,
        title: eachTrendingVideoItem.title,
        viewCount: eachTrendingVideoItem.view_count,
      }))
      this.setState({
        trendingVideosListData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderingLoadingView = () => (
    <div className="loader-container2" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderingTrendingVideosSuccessData = () => {
    const {trendingVideosListData} = this.state

    return (
      <div className="successContainer">
        <nav className="navContainerForTrending">
          <div className="iconContainer">
            <FaFire className="trendingIconStyling" />
          </div>
          <h1 className="trendingHeading">Trending</h1>
        </nav>
        <ul className="trendingCards">
          {trendingVideosListData.map(eachPassingData => (
            <TrendingVideoCard
              passingTrendingData={eachPassingData}
              key={eachPassingData.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderingTrendingFailureView = () => (
    <TrendingFailureContainer>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="trendingFailureImageStyling"
      />
      <TrendingFailureHeading className="trendingFailureHeading">
        Oops! Something Went Wrong
      </TrendingFailureHeading>
      <TrendingFailureParagraph className="trendingFailurePara">
        We are having some trouble
      </TrendingFailureParagraph>
      <TrendingFailureButton onClick={this.getTrendingVideosData}>
        Retry
      </TrendingFailureButton>
    </TrendingFailureContainer>
  )

  renderingFinalResultsInTrending = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingTrendingVideosSuccessData()
      case apiStatusConstants.failure:
        return this.renderingTrendingFailureView()
      case apiStatusConstants.inprogress:
        return this.renderingLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="lastContainer">
        <Header />
        <div className="trendingFinalFlexedContainer">
          <AllFeaturesComponent />
          {this.renderingFinalResultsInTrending()}
        </div>
      </div>
    )
  }
}

export default TrendingComponent
