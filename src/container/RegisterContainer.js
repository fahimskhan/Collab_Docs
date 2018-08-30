import React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class RegisterContainer extends React.Component {

  render() {
    return(
      <div className='home-container'>
        <div className='home-tag'>
          <h1 className='header'>Collab Docs</h1>
          <TextField type='text' label='Username' onChange={(e) => this.props.usernameOnChange(e)} value={this.props.username}/>
          <TextField type='password' label='Password' onChange={(e) => this.props.passwordOnChange(e)} value={this.props.password}/>
          {
            this.props.user
            ? this.props.user.errors
            ? <span className='warning-label'>Registration failed, try again!</span>
            : this.props.user.username && this.props.user.password
            ? <Redirect to="/"/>
            : <span></span>
            : <span></span>
          }
          <div>
            <NavLink to='/' style={{textDecoration: 'none'}}>
              <Button variant='text' color='secondary'>
                Login
              </Button>
            </NavLink>
            <Button variant='contained' color='primary' onClick={() => this.props.registerButton(this.props.username, this.props.password)}>
              Register
            </Button>
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
  };
};


export default connect(mapStateToProps, actions)(RegisterContainer);
