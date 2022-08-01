import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
      className="notFoundImage"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFoundParagraph">
      we are sorry, the page you requested could not be found.
    </p>
  </div>
)
export default NotFound
