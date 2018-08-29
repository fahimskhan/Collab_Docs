import React from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class RegisterContainer extends React.Component {

  render() {
    return(
      <div className='home-container'>
        <div className='home-tag'>
          <h1 className='header'>Collab Docs</h1>
          <TextField label='Name' value=''/>
          <TextField label='Email' value=''/>
          <TextField label='Password' value=''/>
          <TextField label='Repeat password' value=''/>
          <div>
            <NavLink to='/' style={{textDecoration: 'none'}}><Button variant='text' color='secondary'>Login</Button></NavLink>
            <NavLink to='/' style={{textDecoration: 'none'}}><Button variant='contained' color='primary'>Register</Button></NavLink>
          </div>
        </div>
      </div>

    )
  }
}
