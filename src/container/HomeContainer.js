import React from 'react';
import { Link } from 'react-router-dom';

export default class HomeContainer extends React.Component {

  render() {
    return(
      <div className="home-container">
        <div className="home-tag">
          <h1>Collab Docs</h1>
          <Link to='/editor'><i className="material-icons home-icon">edit</i></Link>
        </div>
      </div>

    )
  }
}
