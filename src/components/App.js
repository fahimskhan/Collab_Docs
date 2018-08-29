import React from 'react';
import { Switch, Route } from 'react-router';
import EditorContainer from '../container/EditorContainer';
import HomeContainer from '../container/HomeContainer';

export default class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path='/editor' component={EditorContainer} />
        <Route path='/' component={HomeContainer} />
      </Switch>
    )
  }
}
