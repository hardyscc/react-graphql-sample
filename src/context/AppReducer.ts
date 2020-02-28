export default (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};
