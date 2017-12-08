import ChieveChatApi from '../api/chieveChatApi';

export function changeFilter(filterName, showMessages) {
  return {
    type: 'CHANGE_FILTER',
    filterName,
    showMessages
  };
}

export function showPopup() {
  return {
    type: 'SHOW_POPUP'
  };
}

export function hidePopup() {
  return {
    type: 'HIDE_POPUP'
  };
}

export function postMessage(messageBody, parentMessageId) {
  return function(dispatch) {
    ChieveChatApi.postMessage(messageBody, parentMessageId).then(() => {
      dispatch(hidePopup());
    });
  }
}
