import { EditorState } from 'draft-js';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('connect', function() {
  console.log('connected!');
});

socket.on('message', function(data){
  console.log('got msg from willlee');
})

const initState = {
  editorState: EditorState.createEmpty(),
  username: '',
  password: '',
  user: {},
  loggedIn: false,
}

export const webSocketMiddleware = store => next => action => {
  if (action.type === 'NOTHING') {
    console.log('@@', action);
    socket.emit('login', {/*pass data to backend here*/}, (data)=> {
      console.log('data from server', data);
      store.dispatch({
        type: 'LOGIN_STATE',
        payload: data,
      })
    })
    return;
  } else if (action.type === 'STOP_TIMER') {
    clearInterval(action.interval);
  }
  next(action);
};


export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        editorState: action.editorState,
      }
    case 'USERNAME_ON_CHANGE':
      return {
        ...state,
        username: action.username,
      };
    case 'PASSWORD_ON_CHANGE':
      return {
        ...state,
        password: action.password,
      }
    case 'REGISTER':
      return {
        ...state,
        user: action.user,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
        username: '',
        password: '',
        loggedIn: false,
      };
    default:
      return state;
  }
};
