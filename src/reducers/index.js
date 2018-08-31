import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

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
  docName: '',
  allDocs: [],
  currentDocId: '',
}

console.log('this is what you want to see ', initState.editorState);

export const webSocketMiddleware = store => next => action => {
  if (action.type === 'CREATE_DOC') {
    console.log('ROHAN ', action.user);
    const editorState = EditorState.createEmpty();
    socket.emit('createDoc', {name: action.docName, content: JSON.stringify(convertToRaw(editorState.getCurrentContent())), author: action.user._id}, () => {
      store.dispatch({
        type: 'CLEAR_DOC_NAME',
      })
    })
    return;
  } else if (action.type === 'GET_ALL_DOCS') {
    console.log('inside get all docs socket call');
    socket.emit('getAllDocs', {author: action.user._id}, (data) => {
      console.log('has data', data);
      store.dispatch({
        type: 'SHOW_ALL_DOCS',
        allDocs: data,
      })
    })
    return;
  } else if (action.type === 'DELETE_DOC') {
    socket.emit('deleteDoc', {id: action.docId}, () => {
      store.dispatch({
        type: 'GET_ALL_DOCS',
        user: action.user,
      })
    })
    return;
  } else if (action.type === 'EDIT_DOC') {
    socket.emit('editDoc', {id: action.docId}, (data) => {
      const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
      store.dispatch({
        type: 'SHOW_EDITOR',
        editorState: editorState,
        currentDocId: data._id,
      })
    })
    return;
  } else if (action.type === 'SAVE_DOC') {
    console.log('@@@@', action.editorState);
    socket.emit('saveDoc', {id: action.currentDocId, content: JSON.stringify(convertToRaw(action.editorState.getCurrentContent()))}, () => {
      //zzzz something
    })
    return;
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
    case 'DOC_NAME_ON_CHANGE':
      return {
        ...state,
        docName: action.docName,
      }
    case 'CLEAR_DOC_NAME':
      return {
        ...state,
        docName: '',
      };
    case 'SHOW_ALL_DOCS':
      return {
        ...state,
        allDocs: action.allDocs,
        currentDocId: '',
        editorState: EditorState.createEmpty(),
      };
    case 'SHOW_EDITOR':
      return {
        ...state,
        editorState: action.editorState,
        currentDocId: action.currentDocId,
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
