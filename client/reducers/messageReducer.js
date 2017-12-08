export default function messageReducer(state = { showPopup: true }, action) {
  switch (action.type) {
    case 'SHOW_POPUP':
      return Object.assign({}, state, { showPopup: true });
      break;

    case 'HIDE_POPUP':
      return Object.assign({}, state, { showPopup: false });
      break;

    default:
      return state;
  }
}
