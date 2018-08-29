import React from 'react';
//import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={App}/>
    </Router>
  </Provider>
)

//zzzz Additionally, we will add the optional :filter? parameter to /, because we will need it further on when we try to read the parameter :filter from the URL.

// Root.propTypes = {
//   store: PropTypes.object.isRequired
// }

export default Root;
