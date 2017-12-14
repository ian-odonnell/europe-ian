export default function chatReducer(state = {chatMessages: []}, action) {
  switch (action.type) {
    case 'CHAT_LOADED':
      calculateChatGroups(action.latestChat);
      return Object.assign({}, state, {chatMessages: action.latestChat});

    default:
      return state;
  }
}

// Maybe move this out of this file?
function calculateChatGroups(chatArray) {
  const lastIndex = chatArray.length - 1;
  chatArray[lastIndex].personaRows = 1;
  chatArray[lastIndex].gameRows = 1;

  for (let i = lastIndex - 1; i >= 0; --i) {
    if (chatArray[i].persona.id === chatArray[i + 1].persona.id) {
      chatArray[i].personaRows = chatArray[i + 1].personaRows + 1;
      chatArray[i + 1].personaRows = undefined;
    }
    else {
      chatArray[i].personaRows = 1;
    }

    if (chatArray[i].persona.id === chatArray[i + 1].persona.id && chatArray[i].achievement && chatArray[i + 1].achievement && chatArray[i].achievement.game.id === chatArray[i + 1].achievement.game.id) {
      chatArray[i].gameRows = chatArray[i + 1].gameRows + 1;
      chatArray[i + 1].gameRows = undefined;
    }
    else {
      chatArray[i].gameRows = 1;
    }
  }
}
