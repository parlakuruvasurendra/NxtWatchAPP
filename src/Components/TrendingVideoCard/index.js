import './index.css'
import {Link} from 'react-router-dom'

const TrendingVideoCard = props => {
  const {passingTrendingData} = props
  const {
    thumbnailUrl,
    viewCount,
    title,
    id,
    publishedAt,
    profileImageUrl,
    name,
  } = passingTrendingData
  return (
    <li className="trendingList">
      <Link to={`/videos/${id}`} className="removeTrendingLinkItems">
        <div className="eachTrendingCard">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="trendingImageThumbnailStyling"
          />
          <div className="textContainer">
            <div className="titleProfileStyling">
              <img
                src={profileImageUrl}
                alt="profile_image_url"
                className="videoProfileStyling"
              />
              <div className="mobileAgainFlexed">
                <p className="trendingTitle">{title}</p>
                <div className="mobileFlexedContainer">
                  <p className="trendingName">{name}</p>
                  <div className="trendingFlexedContainer">
                    <p className="trendingViewsCount">{viewCount} views</p>
                    <p className="trendingPublishedCount">{publishedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default TrendingVideoCard
