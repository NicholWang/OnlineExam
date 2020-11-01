import userType from './user.types';

export const setCurrentUser = (user) => {
  return {
    type: userType.SET_CURRENT_USER,
    payload: user,
  };
};

// export const setAllClass = (allclass) => {
//   return {
//     type: userType.GET_ALL_CLASS,
//     payload: allclass
//   }
// }


export const setRootActive = (title) => {
  return{
    type: userType.SET_ROOT_ACTIVE,
    payload: title
  }
}