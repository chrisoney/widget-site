import { fetch } from './csrf';

enum SessionReducerKeys {
  addSessionUser = 'session/addUser',
  removeSessionUser = 'session/removeUser'
}

interface UserAttrs {
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