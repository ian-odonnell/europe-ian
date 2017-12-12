import ChieveChatApi from '../api/chieveChatApi';

export function changeFilter(filterName, showMessages) {
  console.log("changeFilter() - "+ Date());
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

export function switchUser(newUser) {
  return {
    type: 'SWITCH_USER',
    user: newUser
  };
}

export function nextPersona() {
  return {
    type: 'NEXT_PERSONA'
  };
}

export function previousPersona() {
  return {
    type: 'PREVIOUS_PERSONA'
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
