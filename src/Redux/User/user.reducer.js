import userType from "./user.types";

const initialState = {
  currentUser: null,
  title: '添加班级'
  // allclass: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    // case userType.GET_ALL_CLASS:
    //   return {
    //     ...state,
    //     allclass: action.payload
    //   }
    case userType.SET_ROOT_ACTIVE:
      console.log({
        ...state,
        title: action.payload
      });
      return{
        ...state,
        title: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;