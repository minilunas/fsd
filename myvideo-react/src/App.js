import React from 'react';
import Videoplayer from "./components/video/Videoplayer";
import NewVideo from "./components/NewVideo";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
function App() {
  return (
      <Router>
    <div className="App">
        <nav className="navbar fixed-top navbar-expand-sm bg-primary navbar-dark">
            <a className="navbar-brand" href="#">lunas</a>
            <ul className="navbar-nav">

                <li className="nav-item ">
                    <a className="nav-link" href='/'>video player</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href='/newvideo'>new video</a>
                </li>

            </ul>
        </nav>
        <br/>
        <br/>
        <br/>
        <Route exact path="/" component={Videoplayer} />
        <Route path="/newvideo" component={NewVideo} />

    </div>
      </Router>
  );
}

export default App;
