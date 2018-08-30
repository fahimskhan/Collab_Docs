import React from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../actions/index';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

class DocumentsContainer extends React.Component {

  componentDidMount() {
    //get all docs here
  }

  render() {
    return (
      <div>
        {
          this.props.loggedIn
          ? <div className="content">
            <AppBar className="appbar" position='absolute'>
              <nav>
                  <div className="nav-wrapper">
                    <div>
                      <NavLink to='/' style={{textDecoration: 'none'}}>
                        <i className="material-icons nav-icons">
                          home
                        </i>
                      </NavLink>
                      <div className="dropdown">
                        <i className='material-icons nav-icons'>person</i>
                        <div className="dropdown-content">
                          <a href="#">{this.props.user.username}</a>
                        </div>
                      </div>
                    </div>
                    <h1 className="header">Collab Docs</h1>
                    <div>
                      <NavLink to='/new' style={{textDecoration: 'none'}}>
                      <i className="material-icons nav-icons">note_add</i>
                      </NavLink>
                      <NavLink to='/access' style={{textDecoration: 'none'}}>
                      <i className="material-icons nav-icons">cloud_download</i>

                      </NavLink>
                    </div>
                  </div>
              </nav>
              </AppBar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='page-backdrop'>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Doc Name</TableCell>
                      <TableCell>Doc Key</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Final Project</TableCell>
                        <TableCell>rohanisarandihijra</TableCell>
                        <TableCell>
                          <NavLink to='/editor' style={{textDecoration: 'none'}}>
                            <i className="material-icons">
                              edit
                            </i>
                          </NavLink>
                        </TableCell>
                        <TableCell><i className="material-icons">delete_forever</i></TableCell>
                      </TableRow>
                    </TableBody>
                </Table>
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
  };
};

export default connect(mapStateToProps, actions)(DocumentsContainer);
