export const initialState = {
  avatar: "",
  favorites: [],
  appointments: [],
};

export default function UserReducer() {
  switch (action.type) {
    case "setAvatar":
      return { ...state, avatar: action.payload.avatar };
      break;
    default:
      return state;
  }
}
