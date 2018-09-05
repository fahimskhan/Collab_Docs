import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../actions/index';

class HomeContainer extends React.Component {

  componentDidMount() {
    this.props.logoutOnHome();
  }

  render() {
    return(
      <div className='home-container'>
        <div className='home-tag'>
          <h1 className='header'>Collab Docs</h1>
          <TextField type='text' label='Username' onChange={(e) => this.props.usernameOnChange(e)} value={this.props.username} />
          <TextField type='password' label='Password' onChange={(e) => this.props.passwordOnChange(e)} value={this.props.password}/>
          {
            this.props.loggedIn
            ? <Redirect to="/documents"/>
            : <span></span>
          }
          <div>
            <Button variant='contained' color='primary' onClick={() => this.props.loginButton(this.props.username, this.props.password)}>
              Login
            </Button>
            <NavLink to='/register' style={{textDecoration: 'none'}}>
              <Button variant='text' color='secondary'>
                Register
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    user: state.user,
    loggedIn: state.loggedIn,
  };
};


export default connect(mapStateToProps, actions)(HomeContainer);
