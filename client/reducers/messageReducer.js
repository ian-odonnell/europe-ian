export default function messageReducer(state = { showPopup: false, replyToMessage: undefined }, action) {
  switch (action.type) {
    case 'SHOW_POPUP':
      return Object.assign({}, state, { showPopup: true, replyToMessage: action.parentMessage });
      break;

    case 'HIDE_POPUP':
      return Object.assign({}, state, { showPopup: false });
      break;

    default:
      return state;
  }
}
