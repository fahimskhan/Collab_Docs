import React from 'react';
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
    this.props.getSharedDocs(this.props.user);
    this.props.getMyDocs(this.props.user);
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
                        <i className='material-icons nav-icons'>person_pin</i>
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
                      <TableCell><i className="material-icons">person</i></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Doc Name</TableCell>
                      <TableCell>Doc Key</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.props.myDocs && this.props.myDocs.map(doc => (
                        <TableRow>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc._id}</TableCell>
                          <TableCell>
                            <NavLink to='/editor' style={{textDecoration: 'none'}}>
                              <Button onClick={() => this.props.editDoc(doc._id)}>
                                <i className="material-icons">
                                  edit
                                </i>
                              </Button>
                            </NavLink>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => this.props.deleteDoc(doc._id, this.props.user)}>
                              <i className="material-icons">
                                delete_forever
                              </i>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell><i className="material-icons">people</i></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Doc Name</TableCell>
                      <TableCell>Doc Key</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.props.sharedDocs && this.props.sharedDocs.map(doc => (
                        <TableRow>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc._id}</TableCell>
                          <TableCell>
                            <NavLink to='/editor' style={{textDecoration: 'none'}}>
                              <Button onClick={() => this.props.editDoc(doc._id)}>
                                <i className="material-icons">
                                  edit
                                </i>
                              </Button>
                            </NavLink>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => this.props.removeDoc(doc._id, this.props.user)}>
                              <i className="material-icons">
                                remove
                              </i>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
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
    myDocs: state.myDocs,
    sharedDocs: state.sharedDocs,
  };
};

export default connect(mapStateToProps, actions)(DocumentsContainer);
