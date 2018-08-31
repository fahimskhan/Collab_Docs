import axios from 'axios';
const url = 'http://localhost:3000';

export const onChange = (editorState) => dispatch => {
  dispatch ({
    type: 'ON_CHANGE',
    editorState,
  })
};

export const usernameOnChange = (e) => dispatch => {
  dispatch ({
    type: 'USERNAME_ON_CHANGE',
    username: e.target.value,
  })
};

export const passwordOnChange = (e) => dispatch => {
  dispatch ({
    type: 'PASSWORD_ON_CHANGE',
    password: e.target.value,
  })
};

export const docNameOnChange = (e) => dispatch => {
  dispatch ({
    type: 'DOC_NAME_ON_CHANGE',
    docName: e.target.value,
  })
};

export const docKeyOnChange = (e) => dispatch => {
  dispatch ({
    type: 'DOC_KEY_ON_CHANGE',
    docKey: e.target.value,
  })
};

export const createDocButton = (docName, user) => dispatch => {
  dispatch ({
    type: 'CREATE_DOC',
    docName: docName,
    user: user,
  })
};

export const accessDocButton = (docKey, user) => dispatch => {
  dispatch ({
    type: 'ACCESS_DOC',
    docKey: docKey,
    user: user,
  })
};

export const getMyDocs = (user) => dispatch => {
  dispatch ({
    type: 'GET_MY_DOCS',
    user: user,
  })
};

export const getSharedDocs = (user) => dispatch => {
  dispatch ({
    type: 'GET_SHARED_DOCS',
    user: user,
  })
};

export const editDoc = (docId, user) => dispatch => {
  dispatch ({
    type: 'EDIT_DOC',
    docId: docId,
    user: user,
  })
};

export const saveDoc = (editorState, currentDocId) => dispatch => {
  dispatch ({
    type: 'SAVE_DOC',
    editorState: editorState,
    currentDocId: currentDocId,
  })
};

export const deleteDoc = (docId, user) => dispatch => {
  dispatch ({
    type: "DELETE_DOC",
    docId: docId,
    user: user,
  })
};

export const removeDoc = (docId, user) => dispatch => {
  dispatch ({
    type: "REMOVE_DOC",
    docId: docId,
    user: user,
  })
};

export const registerButton = (username, password) => async dispatch => {
  const res = await axios.post(url+'/signup', {
    username: username,
    password: password,
  })
  dispatch ({
    type: 'REGISTER',
    user: res.data,
  })
};

export const loginButton = (username, password) => async dispatch => {
  const res = await axios.post(url+'/login', {
    username: username,
    password: password,
  })
  dispatch ({
    type: 'LOGIN',
    user: res.data,
  })
};

export const logoutOnHome = () => async dispatch => {
  const res = await axios.get(url+'/logout')
  console.log(res);
  dispatch ({
    type: 'LOGOUT',
  })
};
