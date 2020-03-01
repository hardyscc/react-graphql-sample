import { Actions, State } from "./GlobalState";

export const AppReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Actions.UPDATE_USERS:
      return {
        ...state,
        users: action.payload
      };
    case Actions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case Actions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    default:
      return state;
  }
};
