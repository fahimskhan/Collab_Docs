import React from 'react';
import { Switch, Route } from 'react-router';
import EditorContainer from '../container/EditorContainer';
import HomeContainer from '../container/HomeContainer';
import RegisterContainer from '../container/RegisterContainer';

export default class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path='/editor' component={EditorContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/' component={HomeContainer} />
      </Switch>
    )
  }
}
