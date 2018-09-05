import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('connect', function() {
  console.log('Connected to socket!');
});

const initStates = {
  editorState: EditorState.createEmpty(),
  username: '',
  password: '',
  user: {},
  loggedIn: false,
  docName: '',
  docKey: '',
  myDocs: [],
  sharedDocs: [],
  currentDocId: '',
  socket: io('http://localhost:3000')
}

export const webSocketMiddleware = store => next => action => {
  if (action.type === 'ON_CHANGE') {
    socket.emit('onChange', {id: action.currentDocId, content: JSON.stringify(convertToRaw(action.editorState.getCurrentContent()))}, () => {})
    return;
  } else if (action.type === 'CREATE_DOC') {
    const editorState = EditorState.createEmpty();
    socket.emit('createDoc', {name: action.docName, content: JSON.stringify(convertToRaw(editorState.getCurrentContent())), author: action.user._id}, () => {
      store.dispatch({
        type: 'CLEAR_DOC_NAME',
      })
      store.dispatch({
        type: 'GET_MY_DOCS',
        user: action.user,
      })
    })
    return;
  } else if (action.type === 'ACCESS_DOC') {
    socket.emit('accessDoc', {id: action.docKey, collaborator: action.user._id}, () => {
      store.dispatch({
        type: 'CLEAR_DOC_KEY',
      })
      store.dispatch({
        type: 'GET_SHARED_DOCS',
        user: action.user,
      })
    })
    return;
  } else if (action.type === 'GET_MY_DOCS') {
    socket.emit('getMyDocs', {author: action.user._id}, (data) => {
      store.dispatch({
        type: 'SHOW_MY_DOCS',
        myDocs: data,
      })
    })
    return;
  } else if (action.type === 'GET_SHARED_DOCS') {
    socket.emit('getSharedDocs', {collaborator: action.user._id}, (data) => {
      store.dispatch({
        type: 'SHOW_SHARED_DOCS',
        sharedDocs: data,
      })
    })
    return;
  } else if (action.type === 'DELETE_DOC') {
    socket.emit('deleteDoc', {id: action.docId}, () => {
      store.dispatch({
        type: 'GET_MY_DOCS',
        user: action.user,
      })
    })
    return;
  } else if (action.type === 'REMOVE_DOC') {
    socket.emit('removeDoc', {id: action.docId, collaborator: action.user._id}, () => {
      store.dispatch({
        type: 'GET_SHARED_DOCS',
        user: action.user,
      })
    })
  } else if (action.type === 'EDIT_DOC') {
    socket.emit('editDoc', {id: action.docId}, (data) => {
      const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
      store.dispatch({
        type: 'SHOW_EDITOR',
        editorState: editorState,
        currentDocId: data._id,
        socket: socket,
      })
    })
    return;
  } else if (action.type === 'SAVE_DOC') {
    socket.emit('saveDoc', {id: action.currentDocId, content: JSON.stringify(convertToRaw(action.editorState.getCurrentContent()))}, () => {})
    return;
  }
  next(action);
};


export default (state = initStates, action) => {
    console.log("lalalal new", initStates);
  switch (action.type) {
    case 'UPDATE_ALL':
    console.log('AAAAA', action);
      return {
        ...state,
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(action.content)))
      };
    case 'USERNAME_ON_CHANGE':
      return {
        ...state,
        username: action.username
      };
    case 'PASSWORD_ON_CHANGE':
      return {
        ...state,
        password: action.password,
      };
    case 'DOC_NAME_ON_CHANGE':
      return {
        ...state,
        docName: action.docName,
      };
    case 'DOC_KEY_ON_CHANGE':
      return {
        ...state,
        docKey: action.docKey,
      };
    case 'CLEAR_DOC_NAME':
      return {
        ...state,
        docName: '',
      };
    case 'CLEAR_DOC_KEY':
      return {
        ...state,
        docKey: '',
      };
    case 'SHOW_MY_DOCS':
      return {
        ...state,
        myDocs: action.myDocs,
        currentDocId: '',
        editorState: EditorState.createEmpty(),
      };
    case 'SHOW_SHARED_DOCS':
      return {
        ...state,
        sharedDocs: action.sharedDocs,
        currentDocId: '',
        editorState: EditorState.createEmpty(),
      };
    case 'SHOW_EDITOR':
      return {
        ...state,
        editorState: action.editorState,
        currentDocId: action.currentDocId,
        // socket,
      };
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
        // socket,
      };
    case 'LOGOUT':
      return {
        ...state,
        editorState: EditorState.createEmpty(),
        username: '',
        password: '',
        user: {},
        loggedIn: false,
        docName: '',
        docKey: '',
        myDocs: [],
        sharedDocs: [],
        currentDocId: '',
      };
    default:
      return state;
  }
};
