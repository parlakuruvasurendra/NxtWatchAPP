import './index.css'
import {Link} from 'react-router-dom'

const VideoCardsComponent = props => {
  const {passingVideosData} = props
  const {
    thumbnailUrl,
    name,
    title,
    id,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = passingVideosData
  return (
    <Link to={`/videos/${id}`} className="removeLinkDefaultStyling">
      <li className="homeRemovingStyles">
        <div className="videoCardBoxes">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="thumbnailImageUrlStyling"
          />
          <div className="combiningRemainingElements">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="profileImageStyling"
            />
            <div className="onlyTextElements">
              <p className="titleStyling">{title}</p>
              <p className="nameStyling">{name}</p>
              <div className="viewsAndPostContainer">
                <p className="viewCount">{viewCount} views</p>
                <p className="publishedStyling">{publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoCardsComponent
