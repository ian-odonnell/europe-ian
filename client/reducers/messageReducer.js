export default function messageReducer(state = { showPopup: false, replyToMessage: undefined }, action) {
  switch (action.type) {
    case 'SHOW_POPUP':
      return Object.assign({}, state, { showPopup: true, replyToMessage: action.parentMessage });

    case 'HIDE_POPUP':
      return Object.assign({}, state, { showPopup: false });

    default:
      return state;
  }
}
