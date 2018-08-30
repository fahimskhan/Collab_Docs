import React from 'react';
import { Switch, Route } from 'react-router';
import EditorContainer from '../container/EditorContainer';
import HomeContainer from '../container/HomeContainer';
import RegisterContainer from '../container/RegisterContainer';
import DocumentsContainer from '../container/DocumentsContainer';
import MakeDocContainer from '../container/MakeDocContainer';
import AccessDocContainer from '../container/AccessDocContainer';

export default class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path='/editor' component={EditorContainer} />
        <Route path='/documents' component={DocumentsContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/new' component={MakeDocContainer} />
        <Route path='/access' component={AccessDocContainer} />
        <Route path='/' component={HomeContainer} />
      </Switch>
    )
  }
}
