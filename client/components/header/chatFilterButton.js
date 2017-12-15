import React from 'react';

export default (props) => {
  const toggleClass = props.showMessages ? "filterButtonShow" : "filterButtonHide";

  return (
    <td onClick={() => props.changeFilter(props.filterName, !props.showMessages)} className={toggleClass}>{props.buttonLabel}</td>
  );
};
