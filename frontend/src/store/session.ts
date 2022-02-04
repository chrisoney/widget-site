import { Dispatch } from 'redux';
import { csrfFetch } from './csrf';

enum SessionReducerKeys {
  addSessionUser = 'session/addUser',
  removeSessionUser = 'session/removeUser'
}

export interface IAddSessionUserAction {
  readonly type: 'ADDUSER';
}
export interface IRemoveSessionUserAction {
  readonly type: 'REMOVEUSER';
}
export type SessionActions =
| IAddSessionUserAction
| IRemoveSessionUserAction

export interface LoginAttrs {
  credential: string,
  password: string
}

export interface SignupAttrs {
  username: string,
  email: string,
  password: string
}

export interface UserAttrs {
  id: number,
  email?: string,
  username: string,
  createdAt: Date,
  updatedAt: Date
}

const addSessionUser = (user: UserAttrs) => ({
  type: SessionReducerKeys.addSessionUser,
  payload: user
})

const removeSessionUser = () => ({
  type: SessionReducerKeys.removeSessionUser,
  payload: {}
})

export const login = (user: LoginAttrs) => async (dispatch: Dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  })
  console.log(res.data);
  dispatch(addSessionUser(res.data.user));
  return res;
}

export const signup = (user: SignupAttrs) => async (dispatch: Dispatch) => {
  const { username, email, password } = user;

  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  });

  dispatch(addSessionUser(res.data.user));
  return res;
}

export const restoreUser = () => async (dispatch: Dispatch) => {
  const res = await csrfFetch('/api/session');
  dispatch(addSessionUser(res.data.user));
  return res;
}

export const logout = () => async (dispatch: Dispatch) => {
  const res = await csrfFetch('/api/session', { method: 'DELETE' });
  dispatch(removeSessionUser());
  return res;
}

interface SessionType {
  user?: UserAttrs | null
}

interface ActionType {
  type: string
  payload: UserAttrs | null
}

const sessionReducer = (
  state: SessionType = { user: null }, 
  action: ActionType
  ) => {
    let newState: SessionType = {};
    switch(action.type) {
      case SessionReducerKeys.addSessionUser:
        newState = Object.assign({ user: null }, state);
        newState.user = action.payload
        return newState;
      case SessionReducerKeys.removeSessionUser:
        newState = Object.assign({ user: null }, state);
        newState.user = null
        return newState;
      default:
        return state;
    }
}

export default sessionReducer;