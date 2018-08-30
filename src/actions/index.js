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

export const clearUser = () => dispatch => {
  dispatch ({
    type: 'CLEAR_USER',
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
}
