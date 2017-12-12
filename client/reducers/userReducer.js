export default function chatReducer(state = { parentUser: undefined, activePersona: undefined }, action) {
  switch (action.type) {
    case 'SWITCH_USER':
      if (action.user) {
        return Object.assign({}, state, { parentUser: action.user, activePersona: action.user.personas[0] });
      } else {
        return Object.assign({}, state, { parentUser: undefined, activePersona: undefined });
      }
      break;

    case 'SWITCH_PERSONA':
      return Object.assign({}, state, { activePersona: action.persona });
      break;

    case 'NEXT_PERSONA':
    case 'PREVIOUS_PERSONA':
      let personaIndex = state.parentUser.personas.findIndex(p => p.id === state.activePersona.id);
      if (personaIndex !== -1) {
        personaIndex = (personaIndex + (action.type == 'NEXT_PERSONA' ? 1 : state.parentUser.personas.length - 1)) % state.parentUser.personas.length;
        return Object.assign({}, state, { activePersona: state.parentUser.personas[personaIndex] });
      }
      return state;
      break;

    default:
      return state;
  }
}
