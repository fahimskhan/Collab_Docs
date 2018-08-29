import React from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class HomeContainer extends React.Component {

  render() {
    return(
      <div className='home-container'>
        <div className='home-tag'>
          <h1 className='header'>Collab Docs</h1>
          <TextField label='Email' value='' />
          <TextField label='Password' value=''/>
          <div>
            <NavLink to='/editor' style={{textDecoration: 'none'}}><Button variant='contained' color='primary'>Login</Button></NavLink>
            <NavLink to='/register' style={{textDecoration: 'none'}}><Button variant='text' color='secondary'>Register</Button></NavLink>
          </div>
        </div>
      </div>

    )
  }
}
