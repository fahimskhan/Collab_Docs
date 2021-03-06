import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../actions/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

class AccessDocContainer extends React.Component {
  render() {
    return(
      <div>
        {
          this.props.loggedIn
          ? <div className="content">
            <AppBar className="appbar" position='absolute'>
              <nav>
                <div className="nav-wrapper">
                  <div>
                    <NavLink to='/documents' style={{textDecoration: 'none'}}>
                      <i className="material-icons nav-icons">
                        view_list
                      </i>
                    </NavLink>
                    <div className="dropdown">
                      <i className='material-icons nav-icons'>person_pin</i>
                      <div className="dropdown-content">
                        <a href="#">{this.props.user.username}</a>
                      </div>
                    </div>
                  </div>
                  <h1 className="header">Collab Docs</h1>
                  <div>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </nav>
              </AppBar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='page-backdrop'>
              <div className='inputFieldAndButton'>
                <TextField type='text' label='Doc Key' onChange={(e) => this.props.docKeyOnChange(e)} value={this.props.docKey}/>
                <NavLink to='/documents' style={{textDecoration: 'none'}}>
                  <Button className='buttons' variant='contained' color='primary' onClick={() => this.props.accessDocButton(this.props.docKey, this.props.user)}>
                    Access Doc
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
          : <Redirect to='/'/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loggedIn: state.loggedIn,
    docKey: state.docKey,
  };
};

export default connect(mapStateToProps, actions)(AccessDocContainer);
