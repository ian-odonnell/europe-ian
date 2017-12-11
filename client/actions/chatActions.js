import ChieveChatApi from '../api/chieveChatApi';

export function changeFilter(filterName, showMessages) {
  return {
    type: 'CHANGE_FILTER',
    filterName,
    showMessages
  };
}

export function showPopup(parentMessage) {
  return {
    type: 'SHOW_POPUP',
    parentMessage
  };
}

export function hidePopup() {
  return {
    type: 'HIDE_POPUP'
  };
}

export function chatLoaded(latestChat) {
  return {
    type: 'CHAT_LOADED',
    latestChat
  };
}

export function switchPersona(newPersona) {
  return {
    type: 'SWITCH_PERSONA',
    persona: newPersona
  };
}

export function postMessage(persona, messageBody, parentMessageId) {
  return function(dispatch) {
    ChieveChatApi.postMessage(persona.id, messageBody, parentMessageId).then(() => {
      dispatch(hidePopup());
    });
  }
}

export function loadChat() {
  return function(dispatch) {
    ChieveChatApi.getChat().then((latestChat) => {
      dispatch(chatLoaded(latestChat));
    });
  }
}
