import './index.css'
import {Link} from 'react-router-dom'

const GamingVideoCard = props => {
  const {passingGamingVideoData} = props
  const {thumbnailUrl, viewCount, id, title} = passingGamingVideoData
  return (
    <li className="gamingListItems">
      <Link to={`/videos/${id}`} className="gamingRemovingLinkingStyles">
        <div className="eachGamingCard">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="gamingThumbnailUrlStyling"
          />
          <p className="gamingTitle">{title}</p>
          <p className="gamingViewCount">{viewCount} watching worldwide</p>
        </div>
      </Link>
    </li>
  )
}

export default GamingVideoCard
