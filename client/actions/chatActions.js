export function changeFilter(filterName, showMessages) {
  return {
    type: 'CHANGE_FILTER',
    filterName,
    showMessages
  };
}
