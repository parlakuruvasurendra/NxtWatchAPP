import './App.css'
import {Route, Switch} from 'react-router-dom'

// import Header from './Components/Header'
// import AllFeaturesComponent from './Components/AllFeaturesComponent'
import LoginFormComponent from './Components/LoginFormComponent'
import VideoItemDetailsComponent from './Components/VideoItemDetailsComponent'
import TrendingComponent from './Components/TrendingComponent'
import GamingComponent from './Components/GamingComponent'
import NotFound from './Components/NotFound'
import Home from './Components/Home'
import SavedVideosComponent from './Components/SavedVideosComponent'
import ProtectedRoute from './Components/ProtectedRoute'
// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route path="/login" component={LoginFormComponent} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/videos/:id"
        component={VideoItemDetailsComponent}
      />
      <ProtectedRoute exact path="/trending" component={TrendingComponent} />
      <ProtectedRoute
        exact
        path="/videos/:id"
        component={VideoItemDetailsComponent}
      />
      <ProtectedRoute exact path="/gaming" component={GamingComponent} />
      <ProtectedRoute
        exact
        path="/videos/:id"
        component={VideoItemDetailsComponent}
      />
      <ProtectedRoute
        exact
        path="/saved-videos"
        component={SavedVideosComponent}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
