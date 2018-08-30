import { EditorState } from 'draft-js';

const initState = {
  editorState: EditorState.createEmpty(),
  username: '',
  password: '',
  user: {},
  loggedIn: false,
}

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
    // case 'CLEAR_USER':
    //   return {
    //     ...state,
    //     user: {},
    //     username: '',
    //     password: '',
    //   };
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
