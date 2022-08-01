import './index.css'

import {Link} from 'react-router-dom'

import {HiOutlineHome} from 'react-icons/hi'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

const AllFeaturesComponent = () => (
  <div className="ulAndDivCombiningContainer">
    <ul className="ulContainer">
      <li className="removeDefaultStyles">
        <Link to="/" className="removeLinkingStyles">
          <div className="homeIconAndTextContainer">
            <HiOutlineHome className="homeIconStyling" />
            <p className="homeStyling">Home</p>
          </div>
        </Link>
      </li>
      <li className="removeDefaultStyles">
        <Link to="/trending" className="removeLinkingStyles">
          <div className="homeIconAndTextContainer">
            <FaFire className="homeIconStyling" />
            <p className="homeStyling">Trending</p>
          </div>
        </Link>
      </li>
      <li className="removeDefaultStyles">
        <Link to="/gaming" className="removeLinkingStyles">
          <div className="homeIconAndTextContainer">
            <SiYoutubegaming className="homeIconStyling" />
            <p className="homeStyling">Gaming</p>
          </div>
        </Link>
      </li>
      <li className="removeDefaultStyles">
        <Link to="/saved-videos" className="removeLinkingStyles">
          <div className="homeIconAndTextContainer">
            <MdPlaylistAdd className="homeIconStyling" />
            <p className="homeStyling">Saved Videos</p>
          </div>
        </Link>
      </li>
    </ul>
    <div className="contactUsContainer">
      <p className="contactParagraph">CONTACT US</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        alt="facebook logo"
        className="fbStyling"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        alt="twitter logo"
        className="fbStyling"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        alt="linked in logo"
        className="fbStyling"
      />
      <p className="channelRecommendation">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)

export default AllFeaturesComponent
