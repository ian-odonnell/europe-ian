export default function filterReducer(state = { showWow: true, showDiablo: true, showOverwatch: true, showSteam: true }, action) {
  switch (action.type) {
    case 'CHANGE_FILTER':
      let newState = Object.assign({}, state);
      switch (action.filterName) {
        case 'wow':
          newState.showWow = action.showMessages;
          break;
        case 'diablo':
          newState.showDiablo = action.showMessages;
          break;
        case 'overwatch':
          newState.showOverwatch = action.showMessages;
          break;
        case 'steam':
          newState.showSteam = action.showMessages;
          break;
      }
      return newState;
      break;

    default:
      return state;
  }
}
