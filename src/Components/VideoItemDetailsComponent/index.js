import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import AllFeaturesComponent from '../AllFeaturesComponent'
import {
  IconContainer,
  NotFoundContainer,
  Image,
  Heading,
  NavLink,
  Desc,
  Retry,
  ViewsText,
} from './StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetailsComponent extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    liked: false,
    disLiked: false,
    videoFullDetailsData: {},
    saved: false,
  }

  componentDidMount() {
    this.getVideoFullDetails()
  }

  getVideoFullDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoItemDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = {
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        description: data.video_details.description,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState({
        videoFullDetailsData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changingLikedVariations = () => {
    const {disLiked} = this.state

    if (disLiked) {
      this.setState(prevState => ({
        disLiked: !prevState.disLiked,
      }))
    }

    this.setState(prevState => ({
      liked: !prevState.liked,
    }))
  }

  addingSavedVideosAnotherComponent = () => {
    this.setState(prevState => ({
      saved: !prevState.saved,
    }))
  }

  changingDisLikedVariations = () => {
    const {liked} = this.state

    if (liked) {
      this.setState(prevState => ({
        liked: !prevState.liked,
      }))
    }

    this.setState(prevState => ({
      disLiked: !prevState.disLiked,
    }))
  }

  renderingVideoFullDetailsSuccessView = () => {
    const {videoFullDetailsData, liked, disLiked, saved} = this.state
    const {
      videoUrl,
      viewCount,
      subscriberCount,
      profileImageUrl,
      publishedAt,
      title,
      description,
      name,
    } = videoFullDetailsData

    const likeClass = liked ? '#2563eb' : '#64748b'
    const dislikeClass = disLiked ? '#2563eb' : '#64748b'

    return (
      <div className="videoContainer">
        <div className="videoPlayerContainer">
          <ReactPlayer
            url={videoUrl}
            controls="true"
            width="100%"
            height="100%"
            className="videoEditing"
          />
        </div>
        <p className="videoDetailTitleStyling">{title}</p>
        <div className="twoContainersCombining">
          <div className="twoElementsContainer">
            <p className="videoDetailsSubscribersStyling">{viewCount} views</p>
            <p className="videoDetailsSubscribersStyling">{publishedAt}</p>
          </div>
          <div className="threeButtonsContainer">
            <div className="likeButtonsContainer">
              <IconContainer
                type="button"
                color={likeClass}
                onClick={this.changingLikedVariations}
              >
                <AiOutlineLike className="likedIconStyling" />
                <ViewsText color={likeClass}>Like</ViewsText>
              </IconContainer>

              <IconContainer
                type="button"
                color={dislikeClass}
                onClick={this.changingDisLikedVariations}
              >
                <BiDislike className="likedIconStyling" />
                <ViewsText color={dislikeClass}>Dislike</ViewsText>
              </IconContainer>

              <IconContainer
                type="button"
                onClick={this.addingSavedVideosAnotherComponent}
              >
                {saved ? (
                  <>
                    <MdPlaylistAdd
                      className="likedIconStyling"
                      color="#2563eb"
                    />
                    <ViewsText color="#2563eb">Saved</ViewsText>
                  </>
                ) : (
                  <>
                    <MdPlaylistAdd
                      className="likedIconStyling"
                      color="#2563eb"
                    />
                    <ViewsText color="#3b82f6">Save</ViewsText>
                  </>
                )}
              </IconContainer>
            </div>
          </div>
        </div>
        <hr className="hrLineStyling" />
        <div className="videoDetailsProfileContainer">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="videoDetailsProfileImageStyling"
          />
          <div className="descriptionContainer">
            <p className="videoDetailsNameStyling">{name}</p>
            <p className="videoDetailsSubscribersStyling2">
              {subscriberCount} subscribers
            </p>
            <p className="descriptionStyling">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderingVideoDetailLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderingVideoFailureScenario = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Desc className="jobs-failure-description">
        We are having some trouble to complete your request.Please try again.
      </Desc>
      <NavLink>
        <Retry
          className="button"
          type="button"
          onClick={this.getSuggestionVideos}
        >
          Retry
        </Retry>
      </NavLink>
    </NotFoundContainer>
  )

  renderingFinalViewForVideoFullDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingVideoFullDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderingVideoFailureScenario()
      case apiStatusConstants.inprogress:
        return this.renderingVideoDetailLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="displayContainer">
          <div className="removingContainer">
            <AllFeaturesComponent />
          </div>
          {this.renderingFinalViewForVideoFullDetails()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetailsComponent
