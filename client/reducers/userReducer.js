export default function chatReducer(state = { activePersona: undefined }, action) {
  switch (action.type) {
    case 'SWITCH_PERSONA':
      return Object.assign({}, state, { activePersona: action.persona });
      break;

    default:
      return state;
  }
}
